import React from 'react';
import {Tabs, Tab, Card, CardBody, CardHeader, Chip, Button} from "@heroui/react"; // Fixed import
import { templates } from '../utils/EmailTemplates';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/getCurrentUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();

  const handleTemplateClick = async (templateIndex, templateName) => {
    const user = await getCurrentUser();
    console.log(user);
    
    if (!user) {
        toast.info("Login To Edit Templates, Redirecting...", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
        });
        
        setTimeout(() => {
            navigate("/login");
        }, 2000);
        return; // Add this to prevent further execution
    } 
    
    // This will only run if user is logged in
    navigate(`/${templateIndex}/${templateName}`);
};
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Tabs 
        aria-label="Template options" 
        className="flex flex-col gap-4"
        color="primary"
        variant="bordered"
      >
        {templates.map((item, index) => (
          <Tab key={item.name} title={item.name}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {/* {item.catagoryTemplates.map((category) => (
                <Card 
                  key={category.templateName} 
                  className="h-full cursor-pointer" 
                  shadow="sm" 
                  radius="lg"
                  onClick={() => handleTemplateClick(index, category.templateName)}
                >
                  <CardHeader className="flex flex-col items-start gap-2 px-4 pt-4 pb-2">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-lg font-semibold text-default-700">
                        {category.templateName}
                      </h3>
                      <Chip 
                        size="sm" 
                        variant="flat" 
                        color="primary" 
                        className="text-xs"
                      >
                        Template
                      </Chip>
                    </div>
                  </CardHeader>
                  <CardBody className="p-4">
                    <category.templateStyle />
                  </CardBody>
                </Card>
              ))} */}

{item.catagoryTemplates.map((category) => (
        <Card
          key={category.templateName}
          className="h-full cursor-pointer relative group overflow-hidden"
          shadow="sm"
          radius="lg"
          
        >
          {/* Original Content */}
          <CardHeader className="flex flex-col items-start gap-2 px-4 pt-4 pb-2">
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold text-default-700">
                {category.templateName}
              </h3>
              <Chip size="sm" variant="flat" color="primary" className="text-xs">
                Template
              </Chip>
            </div>
          </CardHeader>
          <CardBody className="p-4">
            <category.templateStyle />
          </CardBody>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button onClick={() => handleTemplateClick(index, category.id)} className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100 font-medium">
              Use Template
            </Button>
          </div>
        </Card>
      ))}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Home;