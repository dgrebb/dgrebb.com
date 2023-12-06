/*
 * HomePage
 *
 */
import React from "react";
import { Box, Grid, GridItem, Layout, Main } from "@strapi/design-system";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import cornerOrnamentPath from "./assets/corner-ornament.svg";
import ContentBlocks from "../../components/ContentBlocks";

const LogoContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;

  img {
    width: ${150 / 16}rem;
  }
`;

export const HomePageCE = () => {
  return (
    <Layout>
      <FormattedMessage id="HomePage.helmet.title" defaultMessage="Homepage">
        {(title) => <Helmet title={title[0]} />}
      </FormattedMessage>
      <Main>
        <LogoContainer>
          <img alt="" aria-hidden src={cornerOrnamentPath} />
        </LogoContainer>
        <Box padding={10}>
          <Grid>
            <GridItem col={12}>
              <ContentBlocks />
            </GridItem>
          </Grid>
        </Box>
      </Main>
    </Layout>
  );
};

function HomePageSwitch() {
  return <HomePageCE />;
}

export default HomePageSwitch;
