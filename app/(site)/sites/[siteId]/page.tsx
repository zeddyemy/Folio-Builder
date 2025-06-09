

import SiteDashboard from "@/app/components/pages/site/dashboard";

const SiteDashboardPage = async({
	params,
}: {
	params: SitePageParam;
}) => {
	const { siteId } = await params;

	return <SiteDashboard siteId={siteId} />;
}

export default SiteDashboardPage;
