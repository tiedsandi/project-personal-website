import React from 'react';
import Card from './Card';

import DataList from '@/data/projectList.json';

const FeaturedProject = () => {
  const SelectedProjects = DataList.projects.filter((project) => project.selected === true);

  return (
    <div className='flex flex-col bg-primary lg:bg-[#e9e9e9] text-background lg:text-primary p-3 pb-8 lg:my-16'>
      <h3 className='font-bold text-2xl underline mb-6 text-center'>Proyek Terpilih</h3>

      <div className='flex flex-wrap gap-6 justify-center'>
        {SelectedProjects.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProject;
