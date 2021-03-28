
export default function Markdown({ content }) {
    return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    )
}