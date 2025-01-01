import CardDetail from "@/components/card-detail";
import { cardDataMockup } from "@/store/mockData";

export default function Home() {
  return <CardDetail kartuData={cardDataMockup} />;
}
