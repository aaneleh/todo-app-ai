import OpenAI from 'openai';
import { useEffect, useState } from 'react';

function AISummary() {

  const [ summary, setSummary ] = useState<string>('');

  const openAI_API = import.meta.env.VITE_OPENAI_API_KEY;

  const client = new OpenAI({
    apiKey: openAI_API,
    dangerouslyAllowBrowser: true
  });

  const getSuggestion = async () => {
    const response = await client.responses.create({
      model: 'gpt-5.4-mini',
      instructions: 'You are a coding assistant that talks like a pirate',
      input: 'Are semicolons optional in JavaScript?',
    });
    setSummary(response.output_text);
  }

  useEffect(() => {
    getSuggestion();
  },[])

  return (
    <div id="ai-summary">
      IA SUMMARY
      <p>
        {summary}
      </p>
    </div>
  )
}

export default AISummary