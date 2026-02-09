import { useRef, useState } from "preact/hooks"
import type { TtsVoice } from "~types/resource.ts"

interface TtsTestProps {
  voices: TtsVoice[]
}

export default function TtsTest({ voices }: TtsTestProps) {
  const [selectedVoice, setSelectedVoice] = useState(voices[0])
  const [text, setText] = useState(voices[0]?.sampleText ?? "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleSpeak = async () => {
    if (!selectedVoice || !text.trim()) { return }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(selectedVoice.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      if (audioRef.current) {
        audioRef.current.src = url
        audioRef.current.load()
        audioRef.current.play()
      }
    } catch (err) {
      console.error("TTS error:", err)
      setError("Failed to synthesize speech. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceChange = (e: Event) => {
    const voiceName = (e.target as HTMLSelectElement).value
    const voice = voices.find((v) => v.name === voiceName)
    if (voice) {
      setSelectedVoice(voice)
      setText(voice.sampleText)
    }
  }

  return (
    <div class="tts-test">
      {voices.length > 1 && (
        <label class="tts-voice-select">
          <span>Voice:</span>
          <select value={selectedVoice?.name} onChange={handleVoiceChange}>
            {voices.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <textarea
        class="tts-textarea"
        value={text}
        onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
      />

      <button
        class="tts-speak-button"
        onClick={handleSpeak}
        disabled={isLoading || !text.trim()}
      >
        {isLoading ? "Generating..." : "Speak"}
      </button>

      {error && <div class="tts-error">{error}</div>}

      <audio ref={audioRef} controls autoPlay class="tts-audio" />
    </div>
  )
}
