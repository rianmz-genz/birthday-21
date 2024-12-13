import CardDetail from "@/components/card-detail";
import { cardDataMockup } from "@/store/mockData";

export default function Home() {
  return (
    <div>
      <CardDetail kartuData={cardDataMockup} />
      <div className="w-full h-screen"></div>
    </div>
  );
}
