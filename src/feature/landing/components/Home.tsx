import { Button } from "@/components/ui/button"

const Home = () => {
  const bannerImages = [
    '/api/placeholder/800/400',
    '/api/placeholder/800/400',
    '/api/placeholder/800/400'
  ];
  return (
    <div className="relative w-full h-80 bg-purple-100 overflow-hidden">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full flex space-x-4 animate-marquee">
        {bannerImages.map((src, index) => (
          <img 
            key={index}
            src={src}
            alt="Pet banner"
            className="h-64 w-96 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/70 to-purple-700/70 flex items-center justify-center text-center p-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Companion</h1>
        <p className="text-xl text-white mb-6">Adopt, love, and create memories together</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Adopt a Pet
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
            Donate a Pet
          </Button>
        </div>
      </div>
    </div>
  </div>  )
}

export default Home