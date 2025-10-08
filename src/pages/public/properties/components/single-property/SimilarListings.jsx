import RecentProperty from "../../../../../components/common/RecentProperty";
import { useLanguage } from "../../../../../hook/useLanguage";

const SimilarListings = ({ listings }) => {
  const { t } = useLanguage();

  if (!listings.length) return null;

  return (
    <div className="pt-10 md:py-20">
      <h3 className="mb-6 text-2xl font-bold">{t("singleProprty.similar")}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {listings.map((item) => (
          <RecentProperty item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default SimilarListings;
