import { useNavigate, useParams } from "react-router-dom";

import NotFounds from "../../../components/error/NotFounds";
import { getCurrentUser } from "../../../features/auth/authUtils";
import { useLanguage } from "../../../hook/useLanguage";
import { usePropertyData } from "./hooks/usePropertyData";

import PropertyContactCard from "./components/single-property/PropertyContactCard";
import PropertyDetails from "./components/single-property/PropertyDetails";
import PropertyGallery from "./components/single-property/PropertyGallery";
import PropertyHeader from "./components/single-property/PropertyHeader";
import PropertyPrice from "./components/single-property/PropertyPrice";
import SimilarListings from "./components/single-property/SimilarListings";

import plans from "../../../assets/data/plans.json";

const SinglePropertyPage = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const { listing, recent, isLoading } = usePropertyData(id);

  const user = getCurrentUser();
  const isPaidUser = user ? user?.ispaid : false;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="h-screen pt-20">
        <NotFounds message="Property not found." buttonLink="/properties" />
      </div>
    );
  }

  const details = { ...listing.transferDetails, ...listing.otherDetails };

  return (
    <section>
      <header
        className="relative h-[300px] bg-cover bg-center md:h-[400px]"
        style={{
          backgroundImage: `url(${listing.media?.[0]?.url || "/image/random/fallback.jpg"})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-2xl font-bold text-white md:text-4xl">
            {t("filters.top")}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-0">
        <PropertyHeader
          title={listing.title}
          location={listing.location}
          createdAt={listing.createdAt}
          onBack={() => navigate(-1)}
        />

        <PropertyPrice price={listing.price} />

        <PropertyGallery
          isPaidUser={isPaidUser}
          media={listing.media}
          plans={plans}
          user={user}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <PropertyDetails
            description={listing.description}
            features={listing.features}
            isPaidUser={isPaidUser}
            details={details}
            user={user}
          />

          <PropertyContactCard
            isPaidUser={isPaidUser}
            url={listing.url}
            plans={plans}
            user={user}
          />
        </div>

        <SimilarListings listings={recent} />
      </main>
    </section>
  );
};

export default SinglePropertyPage;
