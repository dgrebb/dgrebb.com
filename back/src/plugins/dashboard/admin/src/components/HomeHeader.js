import React from 'react';

import { Box, Button, Flex, Typography } from '@strapi/design-system';
import { Link } from '@strapi/design-system/v2';
import { ArrowRight } from '@strapi/icons';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

const WordWrap = styled(Typography)`
  word-break: break-word;
`;

const HomeHeader = ({ hasCreatedContentType, onCreateCT }) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <Box paddingLeft={6} paddingBottom={10}>
        <Flex direction="column" alignItems="flex-start" gap={5}>
          <Typography as="h1" variant="alpha">
            {hasCreatedContentType
              ? formatMessage({
                  id: 'app.components.HomePage.welcome.again',
                  defaultMessage: "Hello here's a hand 👋",
                })
              : formatMessage({
                  id: 'app.components.HomePage.welcome',
                  defaultMessage: 'Welcome on board!',
                })}
          </Typography>
          <WordWrap textColor="neutral600" variant="epsilon">
            {hasCreatedContentType
              ? formatMessage({
                  id: 'app.components.HomePage.welcomeBlock.content.again',
                  defaultMessage:
                  'Make something',
                })
              : formatMessage({
                  id: 'app.components.HomePage.welcomeBlock.content',
                  defaultMessage:
                  'Congrats! You can make stuff.',
                })}
          </WordWrap>
          {hasCreatedContentType ? null : (
            <Button size="L" onClick={onCreateCT} endIcon={<ArrowRight />}>
              {formatMessage({
                id: 'app.components.HomePage.create',
                defaultMessage: 'Create your first Content type',
              })}
            </Button>
          )}
        </Flex>
      </Box>
    </div>
  );
};

HomeHeader.defaultProps = {
  hasCreatedContentType: undefined,
  onCreateCT: undefined,
};

HomeHeader.propTypes = {
  hasCreatedContentType: PropTypes.bool,
  onCreateCT: PropTypes.func,
};

export default HomeHeader;
