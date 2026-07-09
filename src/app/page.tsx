'use client';

import { useState, useEffect } from 'react';
import { Brief } from "@/app/types";

export default function Home() {
  const [companyName, setCompanyName] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [desiredOutputs, setDesiredOutputs] = useState('');
  const [durationInWeeks, setDurationInWeeks] = useState<number | ''>('');
  const [hoursPerWeek, setHoursPerWeek] = useState<number | ''>('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedBrief, setGeneratedBrief] = useState<Brief | null>(null);
  const [savedBriefs, setSavedBriefs] = useState<Brief[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('briefs');
    if (stored) {
      setSavedBriefs(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setGeneratedBrief(null);

    try {
      const response = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          problemStatement,
          desiredOutputs,
          durationInWeeks,
          hoursPerWeek,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate brief.');
      }

      setGeneratedBrief(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateWeek = (index: number, value: string) => {
    if (!generatedBrief) return;
    const updatedWeeks = [...generatedBrief.weekByWeekPlan];
    updatedWeeks[index] = value;
    setGeneratedBrief({ ...generatedBrief, weekByWeekPlan: updatedWeeks });
  };

  const handleSave = () => {
    if (!generatedBrief) return;
    const updatedList = [generatedBrief, ...savedBriefs];
    setSavedBriefs(updatedList);
    localStorage.setItem('briefs', JSON.stringify(updatedList));
    setGeneratedBrief(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Brief Generator</h1>
        </div>

        <section className="bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Project Parameters</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Company Name</label>
                <input required type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-400 focus:border-gray-700 focus:ring-gray-700 focus:outline-none transition-colors outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Duration (Weeks)</label>
                  <input required type="number" min="1" max="12" value={durationInWeeks} onChange={(e) => setDurationInWeeks(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-400 focus:border-gray-700 focus:ring-gray-700 focus:outline-none transition-colors outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Hours / Week</label>
                  <input required type="number" min="1" max="40" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-400 focus:border-gray-700 focus:ring-gray-700 focus:outline-none transition-colors outline-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Problem Statement</label>
              <textarea required rows={3} value={problemStatement} onChange={(e) => setProblemStatement(e.target.value)} className="mt-1 block w-full p-2 border border-gray-400 focus:border-gray-700 focus:ring-gray-700 focus:outline-none transition-colors outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Desired Outputs</label>
              <textarea required rows={2} value={desiredOutputs} onChange={(e) => setDesiredOutputs(e.target.value)} className="mt-1 block w-full p-2 border border-gray-400 focus:border-gray-700 focus:ring-gray-700 focus:outline-none transition-colors outline-none" />
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4">
              {isLoading ? 'Generating Structure...' : 'Generate Structured Brief'}
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>}
        </section>

        {generatedBrief && (
          <section className={"bg-white p-6 shadow-sm border border-gray-200"}>
            <h2 className={"text-xl font-semibold mb-4 text-gray-700"}>Generated Brief</h2>
              <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={"block text-sm font-medium text-gray-600"}>Project Title</label>
                <input type="text" value={generatedBrief.title} onChange={(e) => setGeneratedBrief({ ...generatedBrief, title: e.target.value })} className={"mt-1 block w-full p-2 border border-gray-400 focus:border-gray-700 focus:ring-gray-700 focus:outline-none transition-colors outline-none"} />
              </div>

              <div>
                <label className={"block text-sm font-medium text-gray-600"}>Overview</label>
                <textarea rows={2} value={generatedBrief.overview} onChange={(e) => setGeneratedBrief({ ...generatedBrief, overview: e.target.value })} className={"mt-1 block w-full p-2 border border-gray-400 focus:border-gray-700 focus:ring-gray-700 focus:outline-none transition-colors outline-none"} />
              </div>

              <div>
                <label className={"block text-sm font-medium text-gray-600"}>Week-by-Week Milestones</label>
                <div className="space-y-2">
                  {generatedBrief.weekByWeekPlan.map((week, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input type="text" value={week} onChange={(e) => handleUpdateWeek(idx, e.target.value)} className={"mt-1 block w-full p-2 border border-gray-400 focus:border-gray-700 focus:ring-gray-700 focus:outline-none transition-colors outline-none"} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className={"text-xl font-semibold mb-4 text-gray-700"}>Skills Candidate Will Develop</label>
                <p className={"block text-sm font-medium text-gray-600"}>{generatedBrief.skillsDeveloped.join(', ')}</p>
              </div>

              <button onClick={handleSave} className={"w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4"}>
                Save and Publish Brief
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}