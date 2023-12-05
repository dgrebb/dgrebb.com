import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Grid, GridItem } from "@strapi/design-system";
import { ContentBox, useTracking } from "@strapi/helper-plugin";
import {
  FeatherSquare,
  InformationSquare,
  ChartBubble,
  Crown,
} from "@strapi/icons";
import { useIntl } from "react-intl";
import styled from "styled-components";

const BlockLink = styled.a`
  text-decoration: none;
`;

const StyledChartBubble = styled(ChartBubble)`
  path {
    fill: #7289da !important;
  }
`;

const StyledInformationSquare = styled(InformationSquare)`
  path {
    stroke: #7289da !important;
  }
`;

const StyledCrown = styled(Crown)`
  path {
    fill: #7289da !important;
    stroke: #7289da !important;
  }
`;

const StyledFeatherSquare = styled(FeatherSquare)`
  path {
    stroke: #7289da !important;
  }
`;

const ContentBlocks = () => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();

  const { push } = useHistory();
  const navigate = (e, url) => {
    e.preventDefault();
    push(url);
  };

  return (
    <Flex direction="column" alignItems="stretch" gap={5}>
      <Grid gap={5}>
        <GridItem col={3}>
          <BlockLink
            href="#"
            onClick={(e) => {
              navigate(
                e,
                "/content-manager/collectionType/api::post.post?page=1&pageSize=100"
              );
            }}
          >
            <ContentBox
              title={formatMessage({
                id: "dashboard.posts.title",
                defaultMessage: "Posts",
              })}
              subtitle={formatMessage({
                id: "dashboard.posts.label",
                defaultMessage: "Edit Posts",
              })}
              icon={<StyledFeatherSquare />}
              iconBackground="primary100"
            />
          </BlockLink>
        </GridItem>
        <GridItem col={3}>
          <BlockLink
            href="#"
            onClick={(e) => {
              navigate(
                e,
                "/content-manager/collectionType/api::project.project?page=1&pageSize=100"
              );
            }}
          >
            <ContentBox
              title={formatMessage({
                id: "dashboard.projects.title",
                defaultMessage: "Edit Projects",
              })}
              subtitle={formatMessage({
                id: "dashboard.projects.subtitle",
                defaultMessage: "Add or Manage Projects",
              })}
              icon={<StyledCrown />}
              iconBackground="primary100"
            />
          </BlockLink>
        </GridItem>
        <GridItem col={3}>
          <BlockLink
            href="#"
            onClick={(e) => {
              navigate(e, "/content-manager/singleType/api::home.home");
            }}
          >
            <ContentBox
              title={formatMessage({
                id: "app.components.HomePage.HomeContent.title",
                defaultMessage: "Edit Projects",
              })}
              subtitle={formatMessage({
                id: "app.components.HomePage.HomeContent.subtitle",
                defaultMessage: "Edit Project Content",
              })}
              icon={<StyledInformationSquare />}
              iconBackground="primary100"
            />
          </BlockLink>
        </GridItem>
        <GridItem col={3}>
          <BlockLink
            href="https://plausible.io/dgrebb.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <ContentBox
              title={formatMessage({
                id: "app.components.HomePage.plausible.title",
                defaultMessage: "Plausible Analytics",
              })}
              subtitle={formatMessage({
                id: "app.components.HomePage.plausible.subtitle",
                defaultMessage: "See the traffic",
              })}
              icon={<StyledChartBubble />}
              iconBackground="primary100"
            />
          </BlockLink>
        </GridItem>
      </Grid>
      <Box padding={4} shadow="filterShadow">
        <iframe
          plausible-embed="true"
          id="plausible"
          src="https://plausible.io/share/dgrebb.com?auth=8sm72wfwKETpyquVl_Np_&embed=true&theme=dark"
          scrolling="no"
          frameBorder="0"
          loading="lazy"
          style={{ width: "1px", minWidth: "100%", height: "2800px" }}
        ></iframe>
        <script async src="https://plausible.io/js/embed.host.js"></script>
      </Box>
    </Flex>
  );
};

export default ContentBlocks;
