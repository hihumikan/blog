import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useTextDirection } from '../../../hooks/useTextDirection';

const Image = styled(GatsbyImage)`
  height: 350px;
  border-radius: calc(var(--defaultRadius) * 2);
  width: var(--articleContainer);
  margin: 0 0 var(--paragraphBottomMargin) 0;

  & img {
    border-radius: calc(var(--defaultRadius) * 2);
  }

  @media screen and (max-width: 860px) {
    width: calc(100% + calc(var(--globalPaddingLr) * 2));
    height: 300px;
    border-radius: 0;
    margin: ${({ $isRtl }) =>
      $isRtl
        ? `0 calc(var(--globalPaddingLr) * -1) var(--paragraphBottomMargin) 0`
        : `0 0 var(--paragraphBottomMargin) calc(var(--globalPaddingLr) * -1)`};

    & img {
      border-radius: 0;
    }
  }

  @media screen and (max-width: 768px) {
    height: 250px;
  }
`;

export const ArticleImage = ({ $isRtl, ...props }) => {
  const { isRtl } = useTextDirection();

  return <Image {...props} $isRtl={isRtl} />;
};
