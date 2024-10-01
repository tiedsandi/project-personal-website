import Card from '@/components/Card';
import React from 'react';

import {projects} from '@/data/projectList.json';

const page = () => {
  return (
    <div className='flex flex-col p-3'>
      <h3 className='font-bold text-2xl underline mb-6 text-center'>Proyek Saya</h3>

      <div className='flex flex-wrap gap-6 justify-center'>
        {projects.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default page;
