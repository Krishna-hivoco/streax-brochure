"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Volume2, AlertTriangle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

export default function VoiceInteraction() {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [topContentAnimated, setTopContentAnimated] = useState(false);
  const [micButtonVisible, setMicButtonVisible] = useState(false);
  const [bottomImageVisible, setBottomImageVisible] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showInterruptPopup, setShowInterruptPopup] = useState(false);
  const [showMicPromptPopup, setShowMicPromptPopup] = useState(false);
  const [isApiPending, setIsApiPending] = useState(false);
  const [hasInitialApiCalled, setHasInitialApiCalled] = useState(false);

  // Debug states
  const [debugInfo, setDebugInfo] = useState("");
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const audioRef = useRef(null);
  const streamingTimeoutRef = useRef(null);
  const interruptPopupTimeoutRef = useRef(null);
  const micPromptPopupTimeoutRef = useRef(null);
  const processingRef = useRef(false);
  const lastProcessedRef = useRef("");
  const debounceTimeoutRef = useRef(null);
  const speechSessionRef = useRef(0);
  const router = useRouter();

  // Access query params directly
  const language = router.query.language || "English";
  const uniqueId = router.query.unique || "hello";

  // Use the custom speech recognition hook
  const {
    recording,
    speechText,
    startSpeechRecognition,
    stopSpeechRecognition,
    setSpeechText, // Add this to clear speechText
  } = useSpeechRecognition();

  const isListening = recording;

  // Set speech support based on hook initialization
  useEffect(() => {
    setIsClient(true);
    // Check if speech recognition is available
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setSpeechSupported(!!SpeechRecognition && window.isSecureContext);
  }, []);

  useEffect(() => {
    // This function handles the beforeunload event (page refresh)
    const handleBeforeUnload = (event) => {
      // Store a flag in sessionStorage to indicate a page refresh is happening
      sessionStorage.setItem("isRefreshing", "true");
    };

    // This function runs when the page loads
    const handlePageLoad = () => {
      // Check if the page is being loaded after a refresh
      const isRefreshing = sessionStorage.getItem("isRefreshing");

      if (isRefreshing === "true") {
        // Clear the flag
        sessionStorage.removeItem("isRefreshing");

        // Redirect to the home page
        router.push("/explore");
      }
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Check on page load
    if (typeof window !== "undefined") {
      handlePageLoad();
    }

    // Clean up event listeners when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  // Animation sequence on component mount
  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setTopContentAnimated(true), 600);
    const timer3 = setTimeout(() => setMicButtonVisible(true), 1000);
    const timer4 = setTimeout(() => setBottomImageVisible(true), 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Auto API call on page load
  useEffect(() => {
    if (isClient && !hasInitialApiCalled) {
      setTimeout(() => {
        console.log("🚀 Making initial API call with 'who are you'");
        handleInitialApiCall("start");
        setHasInitialApiCalled(true);
      }, 1800);
    }
  }, [isClient, hasInitialApiCalled]);

  // Initial API call function
  const handleInitialApiCall = async (text) => {
    setIsApiPending(true);

    try {
      console.log("🌐 Making initial API call with text:", text);

      const response = await fetch(
        "https://tata-sampann-hi.thefirstimpression.ai/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_text: text,
            language: "english",
            session_id: uniqueId,
            is_avatar: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("✅ Initial API response:", data);

      setResponseText(data.response || "Hello! I'm your voice assistant.");

      if (data.audio) {
        playAudio(data.audio);
      }
    } catch (error) {
      console.error("❌ Initial API Error:", error);
      setResponseText(
        "Hello! I'm your voice assistant. How can I help you today?"
      );
    } finally {
      setIsApiPending(false);
    }
  };

  // Handle speech text processing with debounce and session tracking
  useEffect(() => {
    console.log("Speech text effect:", {
      speechText,
      lastProcessed: lastProcessedRef.current,
      isListening,
      isApiPending,
      processingRef: processingRef.current,
      sessionId: speechSessionRef.current,
      isDifferent: speechText !== lastProcessedRef.current,
    });

    // Clear any existing debounce
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Only process if we have valid conditions AND non-empty speech text
    if (
      speechText &&
      speechText.trim() &&
      speechText.trim().length > 0 && // Additional check for meaningful content
      !isListening &&
      !isApiPending &&
      !processingRef.current &&
      speechText !== lastProcessedRef.current
    ) {
      // Debounce the API call to prevent rapid firing
      debounceTimeoutRef.current = setTimeout(() => {
        // Double-check conditions haven't changed during debounce
        if (
          !processingRef.current &&
          !isApiPending &&
          speechText &&
          speechText.trim().length > 0 &&
          speechText !== lastProcessedRef.current
        ) {
          console.log("🚀 Processing new speech (debounced):", speechText);

          // Mark as processing and update last processed immediately
          processingRef.current = true;
          lastProcessedRef.current = speechText;

          handleSpeechEnd(speechText);
        }
      }, 300); // 300ms debounce
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [speechText, isListening, isApiPending]);

  // Interrupt popup effect for audio playing
  useEffect(() => {
    if (isPlaying) {
      const showPopup = () => {
        setShowInterruptPopup(true);
        setTimeout(() => {
          setShowInterruptPopup(false);
        }, 5000);
      };

      showPopup();
      const intervalId = setInterval(showPopup, 10000);

      return () => {
        clearInterval(intervalId);
        setShowInterruptPopup(false);
      };
    } else {
      setShowInterruptPopup(false);
    }
  }, [isPlaying]);

  // Mic prompt popup effect for ready state
  useEffect(() => {
    const isReadyState =
      !isListening &&
      !isPlaying &&
      !isApiPending &&
      !responseText &&
      !isStreaming &&
      !displayedText;

    if (isReadyState) {
      const showPopup = () => {
        setShowMicPromptPopup(true);
        setTimeout(() => {
          setShowMicPromptPopup(false);
        }, 5000);
      };

      micPromptPopupTimeoutRef.current = setTimeout(showPopup, 3000);
      const intervalId = setInterval(showPopup, 10000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(micPromptPopupTimeoutRef.current);
        setShowMicPromptPopup(false);
      };
    } else {
      setShowMicPromptPopup(false);
    }
  }, [
    isListening,
    isPlaying,
    isApiPending,
    responseText,
    isStreaming,
    displayedText,
    speechSupported,
  ]);

  // Streaming text effect
  useEffect(() => {
    if (responseText && !isStreaming) {
      setIsStreaming(true);
      setDisplayedText("");

      let currentIndex = 0;
      const streamText = () => {
        if (currentIndex < responseText.length) {
          setDisplayedText(responseText.slice(0, currentIndex + 1));
          currentIndex++;
          streamingTimeoutRef.current = setTimeout(streamText, 30);
        } else {
          setIsStreaming(false);
        }
      };

      streamText();
    }

    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
      if (interruptPopupTimeoutRef.current) {
        clearTimeout(interruptPopupTimeoutRef.current);
      }
      if (micPromptPopupTimeoutRef.current) {
        clearTimeout(micPromptPopupTimeoutRef.current);
      }
    };
  }, [responseText]);

  const startListening = async () => {
    if (isListening || isApiPending) {
      console.log("Cannot start listening:", {
        isListening,
        isApiPending,
      });
      return;
    }

    setResponseText("");
    setDisplayedText("");

    // Clear previous speechText
    if (setSpeechText) {
      setSpeechText("");
    }

    // Reset processing tracking and increment session
    processingRef.current = false;
    lastProcessedRef.current = "";
    speechSessionRef.current += 1;

    // Clear any pending debounced calls
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    setIsStreaming(false);
    setShowMicPromptPopup(false);

    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
    }

    console.log(
      "🚀 Starting speech recognition... Session:",
      speechSessionRef.current
    );

    startSpeechRecognition();
  };

  const stopListening = () => {
    if (isListening) {
      console.log("🛑 Stopping speech recognition...");
      stopSpeechRecognition();
    }
  };

  const handleSpeechEnd = async (transcript) => {
    // Additional safety check - prevent duplicate API calls
    if (isApiPending || processingRef.current === false) {
      console.log(
        "⚠️ API call prevented - already in progress or processing flag cleared"
      );
      return;
    }

    // Check if transcript is meaningful
    if (!transcript || !transcript.trim() || transcript.trim().length < 2) {
      console.log("⚠️ API call prevented - no meaningful speech detected");
      processingRef.current = false; // Reset processing flag
      return;
    }

    setIsApiPending(true);

    try {
      console.log("🌐 Making API call with transcript:", transcript);

      const response = await fetch(
        "https://tata-sampann-hi.thefirstimpression.ai/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_text: transcript,
            language: "english",
            session_id: uniqueId,
            is_avatar: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("✅ API response:", data);

      setResponseText(data.response || "I heard: " + transcript);

      // Clear speechText after successful API call
      if (setSpeechText) {
        setSpeechText("");
      }

      if (data.audio) {
        playAudio(data.audio);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      setResponseText("Sorry, I couldn't process your request.");

      // Clear speechText even on error
      if (setSpeechText) {
        setSpeechText("");
      }
    } finally {
      setIsApiPending(false);
      processingRef.current = false; // Reset processing flag
    }
  };

  const playAudio = (audioBase64) => {
    setIsPlaying(true);
    const audioSrc = `data:audio/mp3;base64,${audioBase64}`;
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setShowInterruptPopup(false);
    setTimeout(() => {
      startListening();
    }, 500);
  };

  const handleMicClick = () => {
    if (isApiPending) {
      return;
    }

    if (isListening) {
      stopListening();
    } else if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setShowInterruptPopup(false);
      setResponseText("");
      setDisplayedText("");

      // Reset processing tracking and clear any pending calls
      processingRef.current = false;
      lastProcessedRef.current = "";
      speechSessionRef.current += 1;

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      setTimeout(() => {
        startListening();
      }, 100);
    } else {
      startListening();
    }
  };

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-svh">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const handleGoBack = () => {
    router.push("/explore");
  };


  return (
    <div
      className={`flex justify-center items-center h-svh transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        style={{
          backgroundImage: "url('/images/light-bg.png')",
        }}
        className="relative w-full max-w-md h-svh rounded-lg overflow-hidden shadow-lg bg-cover bg-center bg-[#C04A6D]"
      >
        <div className="relative z-10 h-full flex flex-col p-6">
          {/* Debug Info Panel */}
          {debugInfo && (
            <div className="bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded mb-2 font-mono">
              {debugInfo}
            </div>
          )}

          {/* Top - Logo with scale animation */}
          <div className="text-center py-4 ">
            <ArrowLeft className="absolute top-11" onClick={()=> handleGoBack()} />
            <div
              className={`transition-all duration-800 ease-out ${
                topContentAnimated
                  ? "transform scale-100 opacity-100"
                  : "transform scale-75 opacity-0"
              }`}
            >
              <Image
                src="/images/name.png"
                alt="Logo"
                width={120}
                height={120}
                className="mx-auto drop-shadow-lg"
              />
              <p className="font-semibold text-xl mt-3">
                Find answers to your questions with our Voice AI model...
              </p>
            </div>
          </div>

          {/* Middle - Voice Interaction Content */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full text-center">
              {/* Status Text */}
              <div
                className={`mb-8 transition-opacity duration-800 ease-out ${
                  micButtonVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {!isListening ? (
                  <div className="text-white">
                    <h2 className="text-xl font-semibold mb-2">
                      Voice Assistant
                    </h2>
                    <p className="text-sm opacity-90">Tap the mic to start</p>
                  </div>
                ) : isListening ? (
                  <div className="text-white">
                    <h2 className="text-xl font-semibold mb-2">
                      I'm listening...
                    </h2>
                    <p className="text-sm opacity-90">Speak now</p>
                  </div>
                ) : isApiPending ? (
                  <div className="text-white">
                    <h2 className="text-xl font-semibold mb-2">
                      Processing...
                    </h2>
                    <p className="text-sm opacity-90">Please wait</p>
                  </div>
                ) : (
                  <div className="text-white">
                    <h2 className="text-xl font-semibold mb-2">
                      Voice Assistant
                    </h2>
                    <p className="text-sm opacity-90">Tap the mic to start</p>
                  </div>
                )}
              </div>

              {/* Mic Button with opacity animation */}
              <div
                className={`mb-8 relative transition-opacity duration-800 ease-out ${
                  micButtonVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Mic Prompt Popup */}
                {showMicPromptPopup && (
                  <div className="absolute -right-8 top-1/2 transform translate-x-full -translate-y-1/2 z-50 animate-bounce ml-4">
                    <div className="bg-green-600/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-white/20 shadow-lg whitespace-nowrap ml-4">
                      <p className="text-xs font-medium flex items-center">
                        <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
                        Press to ask anything
                      </p>
                      <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-green-600/80"></div>
                    </div>
                  </div>
                )}

                {/* Outer Ripple Effects when Listening */}
                {isListening && (
                  <>
                    <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-red-500/20 animate-ping"></div>
                    <div className="absolute inset-2 w-28 h-28 mx-auto rounded-full bg-red-500/30 animate-ping delay-150"></div>
                    <div className="absolute inset-4 w-24 h-24 mx-auto rounded-full bg-red-500/40 animate-ping delay-300"></div>
                    <div className="absolute inset-6 w-20 h-20 mx-auto rounded-full bg-red-500/50 animate-ping delay-450"></div>
                  </>
                )}

                <button
                  onClick={handleMicClick}
                  disabled={isApiPending}
                  className={`relative w-32 h-32 rounded-full border-4 overflow-hidden transition-all duration-300 transform ${
                    isListening
                      ? "border-red-500 scale-105 shadow-2xl shadow-red-500/50"
                      : isPlaying
                      ? "border-blue-500 scale-105 shadow-xl shadow-blue-500/30"
                      : isApiPending
                      ? "border-orange-500 scale-105 shadow-xl shadow-orange-500/30 cursor-not-allowed opacity-80"
                      : "border-green-500 hover:scale-105 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 cursor-pointer"
                  }`}
                >
                  {/* Background */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      isListening
                        ? "bg-red-500 animate-pulse"
                        : isPlaying
                        ? "bg-blue-500"
                        : isApiPending
                        ? "bg-orange-500 animate-pulse"
                        : "bg-green-500"
                    }`}
                  ></div>

                  {/* Icon */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center">
                    {isListening ? (
                      <div className="flex items-end space-x-1 mt-3">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-white/80 rounded-full animate-pulse"
                            style={{
                              animationDelay: `${i * 100}ms`,
                              animationDuration: `${600 + i * 50}ms`,
                              height: `${8 + (i % 3) * 8}px`,
                            }}
                          ></div>
                        ))}
                      </div>
                    ) : isPlaying ? (
                      <Volume2 className="w-14 h-14 text-white drop-shadow-lg animate-pulse" />
                    ) : isApiPending ? (
                      <>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                        </div>
                        <p className="text-white text-xs mt-2">Processing...</p>
                      </>
                    ) : (
                      <Mic className="w-14 h-14 text-white drop-shadow-lg transition-transform duration-200 hover:scale-110" />
                    )}
                  </div>

                  {isListening && (
                    <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                  )}
                </button>

                {/* Recording indicator */}
                {isListening && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full border-2 border-white animate-pulse flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </div>
                )}
              </div>

              {/* Response Text with Streaming Effect */}
              {(displayedText || isStreaming) && !isListening && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <p className="text-white text-sm leading-relaxed">
                    {displayedText}
                    {isStreaming && (
                      <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse"></span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interrupt Popup */}
          {showInterruptPopup && isPlaying && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
              <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 shadow-lg">
                <p className="text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  Press button to interrupt
                </p>
              </div>
            </div>
          )}

          {/* Bottom image with fade in animation */}
          <div
            className={`py-10 transition-opacity duration-800 ease-out ${
              bottomImageVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/images/hivoco.png"
              alt="Logo"
              width={120}
              height={120}
              className="mx-auto drop-shadow-lg"
            />
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} onEnded={handleAudioEnd} className="hidden" />
      </div>
    </div>
  );
}
