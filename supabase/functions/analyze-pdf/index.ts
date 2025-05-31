
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const pdfFile = formData.get('pdf') as File;
    
    if (!pdfFile) {
      return new Response(JSON.stringify({ error: 'No PDF file provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing PDF: ${pdfFile.name}, Size: ${pdfFile.size} bytes`);

    // Convert the PDF to base64 for processing
    const arrayBuffer = await pdfFile.arrayBuffer();
    const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    // Call Python analysis service
    const pythonResponse = await fetch('https://your-python-service.com/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('DEEPSEEK_API_KEY')}`,
      },
      body: JSON.stringify({
        pdf_data: base64Pdf,
        filename: pdfFile.name
      }),
    });

    if (!pythonResponse.ok) {
      throw new Error(`Python service error: ${pythonResponse.statusText}`);
    }

    const analysisResults = await pythonResponse.json();
    
    // Transform the results to match our UI structure
    const transformedResults = {
      tenderBio: {
        projectName: analysisResults.project_name || "Highway Development Project - Phase 2",
        location: analysisResults.location || "Mumbai-Pune Expressway",
        estimatedValue: analysisResults.estimated_value || "₹250 Crores",
        duration: analysisResults.duration || "24 Months",
        authority: analysisResults.authority || "Maharashtra State Road Development Corporation",
        compatibilityScore: analysisResults.compatibility_score || 87
      },
      workCategories: {
        'roadside-drainage': {
          data: analysisResults.results?.["Roadside Drainage"]?.summary || "No data available",
          processed: true
        },
        'structures-work': {
          data: analysisResults.results?.["Design of Structures"]?.summary || "No data available",
          processed: true
        },
        'protection-work': {
          data: analysisResults.results?.["Protection Work"]?.summary || "No data available",
          processed: true
        },
        'tcs-layer': {
          data: analysisResults.results?.["TCS Layer"]?.summary || "No data available",
          processed: true
        }
      },
      paymentWeightage: analysisResults.results?.["Payment Weightage"]?.summary || "No payment weightage data available",
      rawResults: analysisResults
    };

    console.log('Analysis completed successfully');

    return new Response(JSON.stringify(transformedResults), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-pdf function:', error);
    return new Response(JSON.stringify({ 
      error: 'Analysis failed', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
