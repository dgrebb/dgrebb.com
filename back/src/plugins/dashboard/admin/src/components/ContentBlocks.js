import React from 'react';

import { Box, Flex, Grid, GridItem } from "@strapi/design-system";
import { ContentBox, useTracking } from "@strapi/helper-plugin";
import {
  FeatherSquare,
  InformationSquare,
  ChartBubble,
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

const StyledFeatherSquare = styled(FeatherSquare)`
  path {
    stroke: #7289da !important;
  }
`;

const ContentBlocks = () => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();

  const handleClick = (eventName) => {
    trackUsage(eventName);
  };

  return (
    <Flex direction="column" alignItems="stretch" gap={5}>
      <Grid gap={5}>
        <GridItem col={4}>
          <BlockLink
            href="/admin/content-manager/collectionType/api::post.post"
          >
            <ContentBox
              title={formatMessage({
                id: "app.components.HomePage.ManagePosts.title",
                defaultMessage: "Posts",
              })}
              subtitle={formatMessage({
                id: "app.components.HomePage.ManagePosts.subtitle",
                defaultMessage: "Manage Post Content",
              })}
              icon={<StyledFeatherSquare />}
              iconBackground="primary100"
            />
          </BlockLink>
        </GridItem>
        <GridItem col={4}>
          <BlockLink
            href="/admin/content-manager/singleType/api::home.home"
          >
            <ContentBox
              title={formatMessage({
                id: "app.components.HomePage.HomeContent.title",
                defaultMessage: "Edit Homepage",
              })}
              subtitle={formatMessage({
                id: "app.components.HomePage.HomeContent.subtitle",
                defaultMessage: "Edit Homepage Content",
              })}
              icon={<StyledInformationSquare />}
              iconBackground="primary100"
            />
          </BlockLink>
        </GridItem>
        <GridItem col={4}>
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
          plausible-embed
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
