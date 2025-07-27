import React from 'react';
import ExperienceTimeline from './ExperienceTimeline';

const TimelineTest = () => {
  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-4xl font-bold text-center mb-8">
          Timeline Test
        </h1>
        <ExperienceTimeline />
      </div>
    </div>
  );
};

export default TimelineTest;
