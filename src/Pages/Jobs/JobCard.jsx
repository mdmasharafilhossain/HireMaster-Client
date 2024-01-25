const JobCard = ({ job }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <img
        src={job.company_logo}
        alt={job.company_name}
        className='h-12 mb-4'
      />
      <h2 className='text-xl font-bold mb-2'>{job.job_title}</h2>
      <p className='text-gray-600'>{job.company_name}</p>
      <p className='text-gray-700 mt-4'>{job.job_description}</p>
      <div className='flex items-center justify-between mt-4'>
        <div>
          <p className='text-gray-600'>{job.job_role}</p>
          <p className='text-gray-600'>{job.job_location}</p>
        </div>
        <p className='text-blue-500 font-semibold'>${job.salary}/mo</p>
      </div>
      <div className='mt-4'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
