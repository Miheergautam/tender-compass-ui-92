import { Tender } from "@/context/tenderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ZoomIn } from "lucide-react";

const SiteImages = ({ tenderData }: { tenderData: Tender }) => {
  // const [selectedImage, setSelectedImage] = useState<any>(null);

  //   const siteImages = [
  //     {
  //       id: "1",
  //       src: "https://worldtiles1.waze.com/tiles/17/93135/56855.png?highres=true",
  //       title: "EPC Project Site",
  //       location: "Project Area",
  //       date: "2024-03-15",
  //     },
  //   ];

  return (
    <>
      {/* Site Images Gallery */}

      {tenderData?.metadata?.locationImages?.length > 0 && (
        <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm mt-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Site Images Gallery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tenderData?.metadata?.locationImages?.map((image: string) => (
                <div
                  key={image}
                  className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.open(image, "_blank")}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image}
                      alt="Site Image"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-xs text-gray-200 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <a href={image} target="_blank" rel="noopener noreferrer">
                        Location
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
export default SiteImages;

{
  /* <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Site Images Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {siteImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-medium text-xs truncate">
                        {image.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */
}
