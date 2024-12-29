import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { DEFAULT_PADDING_X, RouteItem } from "../../helpers/constants";
import { Heading5 } from "../headings";

interface BreadcrumbHeaderProps {
  breadcrumbRoutes: Array<RouteItem>;
  isDashboard?: boolean;
}

export default function BreadcrumbHeader({
  breadcrumbRoutes,
  isDashboard = false,
}: BreadcrumbHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between h-[60px] ${
        isDashboard ? "" : "bg-[--gray-100]"
      } `}
      style={{
        padding: ` 0px ${isDashboard ? "" : DEFAULT_PADDING_X}`,
      }}
    >
      {breadcrumbRoutes.length && (
        <>
          {isDashboard ? (
            ""
          ) : (
            <Heading5
              name={breadcrumbRoutes[breadcrumbRoutes.length - 1].name}
            />
          )}
          <Breadcrumb fontWeight="medium" fontSize="sm">
            {breadcrumbRoutes.slice(0, -1).map((route) => (
              <BreadcrumbItem>
                <BreadcrumbLink color={"var(--gray-500)"} href={route.path}>
                  {route.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink
                href={breadcrumbRoutes[breadcrumbRoutes.length - 1].path}
              >
                {breadcrumbRoutes[breadcrumbRoutes.length - 1].name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </>
      )}
    </div>
  );
}
