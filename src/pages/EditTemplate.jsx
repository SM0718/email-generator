import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NavLink, useParams } from 'react-router-dom';
import { templates } from '../utils/EmailTemplates';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/getCurrentUser';


function EditTemplate() {
  const { index, id } = useParams();
  const navigate = useNavigate()

  if(!index || !id) {
    navigate('/')
  }

  useEffect(() => {
    const getUser = async () => {
        try {
            const currentUser = await getCurrentUser(); // Make sure to get the user data
            
            if (!currentUser) {
                toast.info("Please login to continue", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "dark",
                });
                navigate("/login"); // Immediate navigation
                return;
            }
        } catch (error) {
            toast.error("Authentication error", {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
            });
            navigate("/login"); // Immediate navigation on error
        }
    };

    getUser();
}, [navigate]);

  const selectedTemplate = templates[index].catagoryTemplates.find(item => item.id === id);
  // console.log(selectedTemplate);
  const initialHtml = renderToStaticMarkup(<selectedTemplate.templateStyle />);
  const [content, setContent] = useState(initialHtml);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  // const handleSave = async () => {
  //   console.log('Updated HTML:', content);
  //   try {
  //     const request = await fetch('http://localhost:4000/api/v1/templates/add-template',{
  //       method: 'POST',
  //       body: JSON.stringify({
  //         structure: content
  //       })
  //     })

  //     console.log(await request.json())
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };
  const handleSave = async () => {
    console.log('Updated HTML:', content);
    try {
      const response = await fetch('http://localhost:4000/api/v1/templates/add-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include this if authentication is required
        },
        body: JSON.stringify({
          structure: content, // Ensure you're sending the correct data format
        }),
        credentials: 'include'
      });
      
      if(response.ok) {
        const result = await response.json();
        toast.success("Templated Saved Successully, Redirecting...", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        
        setTimeout(() => {
          navigate("/user-templates");
        }, 2000);

        console.log(result);

      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Email Template <NavLink to={'/user-templates'} className={'text-indigo-500'}>My Templates</NavLink></h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Editor Section */}
        <div className="flex-1 bg-white shadow rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Editor</h3>
          <Editor
            apiKey="r5p16if817kgvpqhmb2x1bgufj2wp0022jd3fiqnmpt0a3ke"
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
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Save Changes
          </button>
        </div>

        {/* Preview Section */}
        <div className="flex-1 bg-white shadow rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Preview</h3>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="w-full h-[500px] overflow-auto border border-gray-200 rounded-lg p-4 bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}

export default EditTemplate;
