import React from 'react';
import { graphql } from 'gatsby';

export default function BasicTemplate({ data }) {
  const { markdownRemark } = data;
  const { html } = markdownRemark;

  return (
    <div
      className="container"
      style={{ padding: '10px' }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
