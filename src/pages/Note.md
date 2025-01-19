import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { renderToStaticMarkup } from 'react-dom/server';
import EmailTemplate from './pages/EmailTemplate';

function App() {
  const initialHtml = renderToStaticMarkup(<EmailTemplate />);
  const [content, setContent] = useState(initialHtml);

  console.log(initialHtml)
  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleSave = () => {
    console.log('Updated HTML:', content);
    fetch('/saveUpdatedHTML', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: content }),
    });
  };

  return (
    <div>
      <h2>Edit Email Template</h2>
      <Editor
        apiKey='r5p16if817kgvpqhmb2x1bgufj2wp0022jd3fiqnmpt0a3ke'
        value={content}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
            'template', 'paste', 'hr', 'directionality', 'nonbreaking'
          ],
          toolbar1: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify',
          toolbar2: 'bullist numlist | outdent indent | link image media table | forecolor backcolor | removeformat code fullscreen',
          toolbar3: 'template | hr nonbreaking emoticons | searchreplace help',
          style_formats: [
            { title: 'Headings', items: [
              { title: 'Heading 1', format: 'h1' },
              { title: 'Heading 2', format: 'h2' },
              { title: 'Heading 3', format: 'h3' }
            ]},
            { title: 'Inline', items: [
              { title: 'Bold', format: 'bold' },
              { title: 'Italic', format: 'italic' },
              { title: 'Underline', format: 'underline' },
              { title: 'Strikethrough', format: 'strikethrough' },
              { title: 'Superscript', format: 'superscript' },
              { title: 'Subscript', format: 'subscript' },
              { title: 'Code', format: 'code' }
            ]},
            { title: 'Blocks', items: [
              { title: 'Paragraph', format: 'p' },
              { title: 'Blockquote', format: 'blockquote' },
              { title: 'Div', format: 'div' },
              { title: 'Pre', format: 'pre' }
            ]}
          ],
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
              margin: 1rem;
            }
            .custom-button {
              padding: 8px 16px;
              background-color: #007bff;
              color: white;
              border-radius: 4px;
              border: none;
              cursor: pointer;
            }
          `,
          templates: [
            {
              title: 'Basic Section',
              description: 'Adds a basic section with heading and paragraph',
              content: '<div class="section"><h2>Section Title</h2><p>Your content here...</p></div>'
            }
          ],
          image_advtab: true,
          link_list: [
            { title: 'My page 1', value: 'http://www.example.com' },
            { title: 'My page 2', value: 'http://www.example.com' }
          ],
          image_list: [
            { title: 'My image 1', value: 'http://www.example.com/image1.jpg' },
            { title: 'My image 2', value: 'http://www.example.com/image2.jpg' }
          ],
          table_class_list: [
            { title: 'None', value: '' },
            { title: 'Basic Table', value: 'table' },
            { title: 'Striped Table', value: 'table table-striped' }
          ],
          width: '100%',
          height: 600,
          resize: true,
          contextmenu: "link image table",
          branding: false,
          promotion: false
        }}
      />
      <button 
        onClick={handleSave} 
        style={{ 
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Save Changes
      </button>
      <h3>Preview:</h3>
      <div 
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          width: '500px',
          margin: '20px 0',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      />
    </div>
  );
}

export default App;