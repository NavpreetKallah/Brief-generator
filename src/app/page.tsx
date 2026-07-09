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


  return ("");
}