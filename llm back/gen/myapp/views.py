from django.http import JsonResponse
from llama_index.llms.ollama import Ollama

# Initialize the LLAMA model outside of the view function
llm = Ollama(model="llama3")

# View function for processing text
# View function for processing text
def process_text(request):
    if request.method == 'POST':
        input_text = request.POST.get('text', '')  # Assuming the input is sent via POST request with 'text' parameter

        # Perform the heavy processing synchronously
        output_text = llm.complete(" generate a comprehensive epics for this project decription :" + input_text)

        # Assuming CompletionResponse has a 'text' attribute
        output_text = output_text.text

        # Return the processed text as a JSON response
        return JsonResponse({'output_text': output_text})
    else:
        return JsonResponse({'error': 'POST request required'})
