import sounddevice as sd
from scipy.io.wavfile import write
import os

SAMPLE_RATE = 16000
DURATION = 1.0  # seconds

os.makedirs("data/negative", exist_ok=True)

for i in range(1701):
    # x=input("Press Enter and say 'Hey EDITH'...")
    # if x=="x":
    #     print("Exiting...")
    #     break
    # else:
        audio = sd.rec(int(DURATION * SAMPLE_RATE), samplerate=SAMPLE_RATE, channels=1, dtype='float32')
        sd.wait()
        write(f"data/negative/noise_{i}.wav", SAMPLE_RATE, audio)
        print(f"Recorded noise_{i}.wav recorded.")
    
