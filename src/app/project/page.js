import Card from '@/components/Card';
import React from 'react';

import {projects} from '@/data/projectList.json';

const page = () => {
  const sortProject = projects.sort((a, b) => b.id - a.id);

  return (
    <div className='flex flex-col p-3'>
      <h3 className='mb-6 text-2xl font-bold text-center underline'>Proyek Saya</h3>

      <div className='flex flex-wrap justify-center gap-6'>
        {sortProject.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default page;
