"use client";

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white flex flex-col items-center justify-center'>
      {/* Header Section */}
      <h1
        className='text-5xl md:text-7xl font-bold text-center mb-6'
        style={{
          opacity: 0,
          animation: "fadeInEase 1s forwards, slideDownEase 1s forwards",
        }}
      >
        Training AI with Coze AI
      </h1>
      <p
        className='text-lg md:text-xl text-center max-w-3xl mb-12'
        style={{
          opacity: 0,
          animation: "fadeInEase 1s forwards 1s, slideUpEase 1s forwards 1s",
        }}
      >
        Explore the next generation of artificial intelligence.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-6'>
        {[
          { title: "Data Preparation", description: "Streamline and label datasets efficiently." },
          { title: "Model Training", description: "Run models optimized for accuracy and speed." },
          { title: "Deployment", description: "Deploy AI solutions seamlessly." },
        ].map((feature, index) => (
          <div
            key={index}
            className='bg-white text-black rounded-xl p-6 shadow-lg hover:scale-105 transform transition-transform'
            style={{
              opacity: 0,
              animation: `fadeInEase 1s forwards ${index * 0.3}s, scaleUpEase 1s forwards ${
                index * 0.3
              }s`,
            }}
          >
            <h3 className='text-xl font-semibold mb-3'>{feature.title}</h3>
            <p className='text-sm text-gray-700'>{feature.description}</p>
          </div>
        ))}
      </div>

      <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div
          className='bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-lg text-center shadow-lg'
          style={{
            opacity: 0,
            animation: "fadeInEase 1s forwards 1.8s, slideUpEase 1s forwards 1.8s",
          }}
        >
          <h3 className='text-2xl font-bold mb-3'>AI Growth Analytics</h3>
          <p className='text-sm'>Visualize progress in training models over time.</p>
        </div>

        <div
          className='bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-lg text-center shadow-lg'
          style={{
            opacity: 0,
            animation: "fadeInEase 1s forwards 1s, slideUpEase 1s forwards 1s",
          }}
        >
          <h3 className='text-2xl font-bold mb-3'>What Our Clients Say</h3>
          <p className='text-sm'>“This platform transformed the way we approach AI training!”</p>
        </div>
      </div>

      <div
        className='mt-16'
        style={{
          opacity: 0,
          animation: "fadeInEase 1s forwards 1s, slideUpEase 1s forwards 1s",
        }}
      >
        <button className='bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors'>
          Get Started
        </button>
      </div>

      <style>
        {`
          @keyframes fadeInEase {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes slideDownEase {
            0% { transform: translateY(-50px); }
            100% { transform: translateY(0); }
          }
          @keyframes slideUpEase {
            0% { transform: translateY(50px); }
            100% { transform: translateY(0); }
          }
          @keyframes scaleUpEase {
            0% { transform: scale(0.9); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
