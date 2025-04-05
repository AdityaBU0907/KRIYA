import whisper
import subprocess
import sys
import json
import re

# Step 1: Transcribe using Whisper
audio_path = sys.argv[1]

model = whisper.load_model("base")
transcribed = model.transcribe(audio_path)["text"]

# Step 2: Create a prompt for Mistral
prompt = f"""
You are a smart assistant. Convert the following worker portfolio text into clean structured JSON format.

Text:
"{transcribed}"

Respond ONLY with a JSON object like:
{{
    "Name": "...",
    "Age": ...,
    "ProfessionalExperience": [
    {{
        "Company": "...",
        "Position": "...",
        "YearsOfService": ...,
        "YearsActive": [start, end]
    }}
    ]
}}
"""

# Step 3: Use Ollama to call Mistral
process = subprocess.run(
    ["ollama", "run", "llama3.2"],
    input=prompt.encode(),
    capture_output=True
)

output = process.stdout.decode()

# Step 4: Extract JSON between triple backticks
def extract_json_from_output(text):
    # Pattern to match content between triple backticks
    pattern = r'(?:json)?\n(.*?)\n'
    match = re.search(pattern, output, re.DOTALL)
    if match:
        return match.group(1)
    return None

json_content = extract_json_from_output(output)

# Step 5: Output final structured JSON and save to file
if json_content:
    try:
        structured_json = json.loads(json_content)
        # Print to console
        print(json.dumps(structured_json, indent=2))
        
        # Save to output.json file
        with open('output.json', 'w') as f:
            json.dump(structured_json, f, indent=2)
        print("\n✅ Successfully saved to output.json")
    except Exception as e:
        print(f"⚠ Could not parse extracted JSON. Error: {e}")
        print("Raw extracted content:")
        print(json_content)
        # Save the raw extracted content to a file if JSON parsing fails
        with open('output.json', 'w') as f:
            f.write(json_content)
else:
    print("⚠ No JSON content found between triple backticks. Full output:")
    print(output)
    # Save the full output to a file if no JSON found
    with open('output.json', 'w') as f:
        f.write(output)