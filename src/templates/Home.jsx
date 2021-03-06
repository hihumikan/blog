import React from 'react';
import { graphql } from 'gatsby';
import { PageWrapper } from '../components/Layout/PageWrapper';
import { Hero } from '../components/Layout/Hero';
import {
  SectionContainerGridThreeCols,
  SectionWrapper,
  SectionTitleContainer,
  TextBox,
} from '../components/Layout/SharedStyles/Sections';
import {
  HeadingSmallWithTip,
  SectionTitle,
} from '../components/Layout/SharedStyles/Headings';
import { RichText } from '../components/Layout/SharedStyles/TextContainers';
import { ArticleCard, CardImgArtDir } from '../components/Layout/Blog/Cards';
import { Navigator } from '../components/LanguageHelpers/Navigator';

const HomepageTemplate = ({
  data: {
    datoCmsHomepage: {
      seo,
      hero: [{ heroAlt, heroTitle, heroSubtitle }],
      features,
      featuredPostsTitle,
    },
    datoCmsBlogRoot: { id },
    allBlogPosts: { postNodes },
    datoCmsMiscTextString: { seeAllButton, seeAllPosts },
  },
  pageContext,
}) => (
  <PageWrapper
    pageData={pageContext}
    seoTitle={seo?.seoTitle}
    seoDescription={seo?.seoDescription}
    seoImage={seo?.seoImage?.seoImageUrl}
  >
    <Hero
      hasDivider
      alt={heroAlt}
      title={heroTitle}
      subtitle={heroSubtitle}
      button={
        <Navigator className="classicButton classicButtonOutline" recordId={id}>
          {seeAllPosts}
        </Navigator>
      }
      sectionChildren={
        <SectionContainerGridThreeCols>
          {features.map(({ id, title, description }) => (
            <TextBox small key={id}>
              <HeadingSmallWithTip>{title}</HeadingSmallWithTip>
              <RichText>{description}</RichText>
            </TextBox>
          ))}
        </SectionContainerGridThreeCols>
      }
    />
    {postNodes.length > 0 && (
      <SectionWrapper backgroundColor="var(--backgroundColorAlt)">
        <SectionTitleContainer hasButton>
          <SectionTitle>{featuredPostsTitle}</SectionTitle>
          <Navigator
            className="classicButton classicButtonOutline"
            recordId={id}
          >
            {seeAllButton}
          </Navigator>
        </SectionTitleContainer>
        <SectionContainerGridThreeCols>
          {postNodes.map(
            ({
              id,
              meta: { updatedAt },
              title,
              coverImage,
              subtitle,
              author: {
                authorName,
                picture: { authorImageData },
              },
              categoryLink,
            }) => (
              <ArticleCard
                key={id}
                recordId={id}
                date={updatedAt}
                category={categoryLink}
                cardImg={
                  coverImage &&
                  CardImgArtDir(
                    coverImage.gatsbyImageData,
                    coverImage.squaredImage,
                    title
                  )
                }
                title={title}
                excerpt={subtitle}
                authorImg={authorImageData}
                authorAltImg={authorName}
                authorName={authorName}
              />
            )
          )}
        </SectionContainerGridThreeCols>
      </SectionWrapper>
    )}
  </PageWrapper>
);

export default HomepageTemplate;

export const query = graphql`
  query HomepageQuery($locale: String!) {
    datoCmsHomepage(locale: { eq: $locale }) {
      locale
      seo {
        seoTitle: title
        seoDescription: description
        seoImage: image {
          seoImageUrl: url
        }
      }
      hero {
        heroAlt
        heroTitle
        heroSubtitle
      }
      features {
        id: originalId
        title
        description
      }
      featuredPostsTitle
    }
    datoCmsBlogRoot(locale: { eq: $locale }) {
      locale
      id: originalId
    }
    allBlogPosts: allDatoCmsBlogPost(
      filter: {
        locale: { eq: $locale }
        featuredInHomepage: { eq: true }
        noTranslate: { ne: true }
        categoryLink: { noTranslate: { ne: true } }
      }
      sort: { order: ASC, fields: meta___updatedAt }
      limit: 6
    ) {
      postNodes: nodes {
        locale
        id: originalId
        meta {
          updatedAt
        }
        categoryLink {
          title
        }
        coverImage {
          gatsbyImageData(
            width: 300
            height: 120
            placeholder: NONE
            forceBlurhash: false
          )
          squaredImage: gatsbyImageData(
            width: 100
            height: 100
            imgixParams: { ar: "1", fit: "crop" }
          )
        }
        author {
          authorName: name
          picture {
            authorImageData: gatsbyImageData(
              height: 30
              width: 30
              placeholder: NONE
            )
          }
        }
        subtitle
        title
      }
    }
    datoCmsMiscTextString(locale: { eq: $locale }) {
      locale
      seeAllButton
      seeAllPosts
    }
  }
`;
