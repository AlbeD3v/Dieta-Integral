import { Fragment } from 'react'

type JsonLdData = {
  '@context': string;
  '@type': string;
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  [key: string]: unknown;
}

interface JsonLdProps {
  data: JsonLdData;
}

const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Fragment>
  )
}

export default JsonLd
