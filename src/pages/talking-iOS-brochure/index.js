"use client";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, MicOff, Volume2, AlertTriangle } from "lucide-react";

import { useRouter } from "next/router";
import useVoiceRecorder from "@/hooks/useVoiceRecorder";

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
  const [shouldAutoStartMic, setShouldAutoStartMic] = useState(false);
  const router = useRouter();

  // Access query params directly
  const language = router.query.language || "English";
  const uniqueId = router.query.unique || "";
  // Debug states
  const [debugInfo, setDebugInfo] = useState("");
  const [isClient, setIsClient] = useState(false);

  const audioRef = useRef(null);
  const streamingTimeoutRef = useRef(null);
  const interruptPopupTimeoutRef = useRef(null);
  const micPromptPopupTimeoutRef = useRef(null);
  const recordingTimerRef = useRef(null); // Timer for 5-second auto-stop

  // Simple flag to prevent multiple API calls
  const apiCallInProgressRef = useRef(false);

  const {
    recordingBlob: recordingAudio,
    isRecording: isListening,
    startRecording,
    stopRecording,
    permissionState,
    recordingTime,
  } = useVoiceRecorder();

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

  // Auto API call on page load with text
  useEffect(() => {
    if (isClient && !hasInitialApiCalled) {
      // Call API with text "start" after animations complete
      setTimeout(() => {
        console.log("🚀 Making initial API call with text: 'start'");
        handleInitialApiCall();
        setHasInitialApiCalled(true);
      }, 1800); // Call after animations complete
    }
  }, [isClient, hasInitialApiCalled]);

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

  const playAudio = (audioBase64) => {
    console.log("🔊 Playing audio...");
    setIsPlaying(true);
    const audioSrc = `data:audio/mp3;base64,${audioBase64}`;
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play().catch((error) => {
        console.error("❌ Audio play error:", error);
        handleAudioEnd(); // Call handleAudioEnd on error too
      });
    }
  };

  // Initial API call function with text instead of audio
  const handleInitialApiCall = async () => {
    setIsApiPending(true);
    // Reset API call flag
    apiCallInProgressRef.current = true;

    try {
      console.log("🌐 Making initial API call with text: 'start'");

      // Create AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(
        "https://tata-sampann-hi.thefirstimpression.ai/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_text: "start", // Send text instead of audio
            language: "english",
            platform: "android", // Use android platform for initial call
            session_id: uniqueId,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("✅ Initial API response:", data);

      setResponseText(
        data.response ||
          "Hello! I'm your voice assistant. How can I help you today?"
      );

      if (data.audio) {
        // Always play audio and it will auto-start mic when it ends
        playAudio(data.audio);
      } else {
        // If no audio, start mic immediately after short delay
        setTimeout(() => {
          startListening();
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Initial API Error:", error);

      if (error.name === "AbortError") {
        console.error("❌ API call timed out");
        setResponseText(
          "Hello! I'm your voice assistant. The connection timed out, but I'm ready to help you."
        );
      } else if (error.message.includes("Failed to fetch")) {
        console.error("❌ Network error - API might be unreachable");
        setResponseText(
          "Hello! I'm your voice assistant. I'm having trouble connecting right now, but I'm ready to help you."
        );
      } else {
        setResponseText(
          "Hello! I'm your voice assistant. How can I help you today?"
        );
      }

      // Start mic after error messages too
      setTimeout(() => {
        startListening();
      }, 2000);
    } finally {
      setIsApiPending(false);
      apiCallInProgressRef.current = false;
    }
  };

  // Convert blob to base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1]; // Remove data:audio/wav;base64, prefix
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const startListening = useCallback(async () => {
    console.log("🎤 startListening called:", {
      permissionState,
      isListening,
      isApiPending,
      isPlaying,
    });

    if (permissionState !== "granted") {
      console.log("❌ Permission not granted:", permissionState);
      return;
    }

    if (isListening || isApiPending || isPlaying) {
      console.log("❌ Cannot start listening:", {
        isListening,
        isApiPending,
        isPlaying,
      });
      return;
    }

    try {
      // Clear previous state
      setResponseText("");
      setDisplayedText("");
      setIsStreaming(false);
      setShowMicPromptPopup(false);
      setShouldAutoStartMic(false);

      // Reset API call flag
      apiCallInProgressRef.current = false;

      // Clear any existing recording timer
      if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
      }

      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }

      console.log("🚀 Starting audio recording...");
      await startRecording();
    } catch (error) {
      console.error("❌ Failed to start recording:", error);
    }
  }, [permissionState, isListening, isApiPending, isPlaying, startRecording]);

  // Memoized API call function to prevent recreating on every render
  const handleAudioProcessing = useCallback(
    async (audioBlob) => {
      // Prevent multiple API calls with a simple flag
      if (apiCallInProgressRef.current || !audioBlob) {
        console.log("⚠️ API call skipped:", {
          inProgress: apiCallInProgressRef.current,
          hasAudio: !!audioBlob,
        });
        return;
      }

      apiCallInProgressRef.current = true;
      setIsApiPending(true);

      try {
        console.log("🎵 Converting audio to base64...");
        const audioBase64 = await blobToBase64(audioBlob);

        console.log("🌐 Making API call with audio data");

        // Create AbortController for timeout handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(
          "https://tata-sampann-hi.thefirstimpression.ai/api/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_text: audioBase64, // Send audio instead of text
              language: "english",
              platform: "iOS",
              session_id: uniqueId,
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("✅ API response:", data);

        setResponseText(data.response || "Audio processed successfully");

        if (data.audio) {
          // Always set flag to auto-start mic after response audio
          setShouldAutoStartMic(true);
          playAudio(data.audio);
        } else {
          // If no audio response, start listening again immediately
          setTimeout(() => {
            startListening();
          }, 500);
        }
      } catch (error) {
        console.error("❌ API Error:", error);

        if (error.name === "AbortError") {
          console.error("❌ API call timed out");
          setResponseText("Sorry, the request timed out. Please try again.");
        } else if (error.message.includes("Failed to fetch")) {
          console.error("❌ Network error - API might be unreachable");
          setResponseText(
            "Sorry, I'm having trouble connecting. Please check your internet connection and try again."
          );
        } else {
          setResponseText("Sorry, I couldn't process your audio.");
        }

        // Always restart the conversation loop after error
        setTimeout(() => {
          startListening();
        }, 2000);
      } finally {
        setIsApiPending(false);
        apiCallInProgressRef.current = false;
      }
    },
    [
      uniqueId,
      blobToBase64,
      playAudio,
      setShouldAutoStartMic,
      setIsApiPending,
      setResponseText,
    ]
  );

  // Handle when recording audio is available - with better control
  useEffect(() => {
    // Only process if we have a new recording and recording has stopped
    if (recordingAudio && !isListening && !apiCallInProgressRef.current) {
      console.log("🎵 Audio recording completed, processing...");
      handleAudioProcessing(recordingAudio);
    }
  }, [recordingAudio]);

  // Auto-stop recording after 5 seconds using the hook's recordingTime
  useEffect(() => {
    if (isListening && recordingTime >= 5) {
      console.log("⏰ 5 seconds elapsed, auto-stopping recording...");
      stopRecording();
    }
  }, [isListening, recordingTime, stopRecording]);

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

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
      !displayedText &&
      permissionState === "granted";

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
    permissionState,
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
      if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
      }
    };
  }, [responseText]);

  const stopListening = () => {
    if (isListening) {
      console.log("🛑 Stopping audio recording...");
      stopRecording();
    }
  };

  const handleAudioEnd = () => {
    console.log("🔇 Audio ended, shouldAutoStartMic:", shouldAutoStartMic);
    setIsPlaying(false);
    setShowInterruptPopup(false);

    // Only auto-start mic if the flag is set
    if (shouldAutoStartMic) {
      setShouldAutoStartMic(false);
      setTimeout(() => {
        console.log("🎤 Auto-starting microphone after audio end...");
        startListening();
      }, 500);
    }
  };

  const handleMicClick = () => {
    console.log("🖱️ Mic button clicked");

    if (isApiPending) {
      console.log("❌ API pending, ignoring click");
      return;
    }

    if (isListening) {
      console.log("🛑 Stopping recording from click");
      stopListening();
    } else if (isPlaying) {
      console.log("⏸️ Interrupting audio playback");
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setShowInterruptPopup(false);
      setShouldAutoStartMic(false);
      setResponseText("");
      setDisplayedText("");
      setTimeout(() => {
        startListening();
      }, 100);
    } else {
      console.log("🎤 Starting recording from click");
      startListening();
    }
  };

  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-svh">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Check if microphone is supported and allowed
  // permissionState: "prompt", "granted", "denied"
  const microphoneSupported = permissionState !== "denied";
  const microphoneAllowed = permissionState === "granted";

  return (
    <div
      className={`flex justify-center items-center h-svh transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-full max-w-md h-svh rounded-lg overflow-hidden shadow-lg bg-cover bg-center bg-[#C04A6D]">
        <div className="relative z-10 h-full flex flex-col p-6">
          {/* Debug Info Panel */}
          {debugInfo && (
            <div className="bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded mb-2 font-mono">
              {debugInfo}
            </div>
          )}

          {/* Top - Logo with scale animation */}
          <div className="text-center py-4">
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
              <p className="font-semibold text-xl mt-3 text-white">
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
                {!microphoneSupported ? (
                  <div className="text-white">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <h2 className="text-xl font-semibold mb-2">
                      Microphone Access Denied
                    </h2>
                    <p className="text-sm opacity-90">
                      Please allow microphone access to continue
                    </p>
                  </div>
                ) : !microphoneAllowed ? (
                  <div className="text-white">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <h2 className="text-xl font-semibold mb-2">
                      Microphone Access Required
                    </h2>
                    <p className="text-sm opacity-90">
                      Please allow microphone access to continue
                    </p>
                  </div>
                ) : isListening ? (
                  <div className="text-white">
                    <h2 className="text-xl font-semibold mb-2">Recording...</h2>
                    <p className="text-sm opacity-90">
                      Speak now ({recordingTime}/5 sec)
                    </p>
                  </div>
                ) : isApiPending ? (
                  <div className="text-white">
                    <h2 className="text-xl font-semibold mb-2">
                      Processing...
                    </h2>
                    <p className="text-sm opacity-90">Please wait</p>
                  </div>
                ) : isPlaying ? (
                  <div className="text-white">
                    <h2 className="text-xl font-semibold mb-2">
                      Playing Response...
                    </h2>
                    <p className="text-sm opacity-90">Tap to interrupt</p>
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
                {showMicPromptPopup && microphoneAllowed && (
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

                {/* Outer Ripple Effects when Recording */}
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
                  disabled={isApiPending || !microphoneSupported}
                  className={`relative w-32 h-32 rounded-full border-4 overflow-hidden transition-all duration-300 transform ${
                    !microphoneSupported
                      ? "border-gray-500 cursor-not-allowed opacity-50"
                      : !microphoneAllowed
                      ? "border-yellow-500 cursor-pointer opacity-80"
                      : isListening
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
                      !microphoneSupported
                        ? "bg-gray-500"
                        : !microphoneAllowed
                        ? "bg-yellow-500"
                        : isListening
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
                    {!microphoneSupported ? (
                      <AlertTriangle className="w-14 h-14 text-white drop-shadow-lg" />
                    ) : !microphoneAllowed ? (
                      <Mic className="w-14 h-14 text-white drop-shadow-lg" />
                    ) : isListening ? (
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
