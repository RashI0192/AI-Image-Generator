const OPENAI_API_KEY ="" //deleted for privacy

const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallery.querySelectorAll(".img-card")[index]; // Fixed typo with querySelectorAll
        const imgElement = imgCard.querySelector("img");

        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`; // Fixed template string syntax

        imgElement.src = aiGeneratedImg;
        imgElement.onload = () => {
            imgCard.classList.remove("loading")

        };
    });
};







const generateAiImages = async (userPrompt, userImgQuantity) => {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: userImgQuantity,
                size: "512x512", 
                response_format: "b64_json" 
            })
        });

        const data = await response.json();
        updateImageCard([...data]);

    } catch (error) {
        console.log(error);
    }
};




const handleFormSubmission = (e) => {
    e.preventDefault();
    const userPrompt = e.target.elements[0].value; // Get the first input value (user prompt)
    const userImgQuantity = e.target.elements[1].value; // Get the second input value (quantity)
    
    // Create an array of image cards based on the quantity
    const imgCardMarkup = Array.from({ length: userImgQuantity}, () => 
        `
            <div class="img-card">
                <img src="./Screenshot 2024-12-21 at 11.21.45 PM.png" alt="image" >
                <a href="#" class="download-btn">
                    <img src="./Screenshot 2024-12-21 at 11.25.05 PM.png" alt="Download icon" class="download-icon">
                </a>
            </div>
        `
    ).join(''); 
    console.log(imgCardMarkup);

    
    gallery.innerHTML = imgCardMarkup; 

    generateAiImages(userPrompt,userImgQuantity);
};

generateForm.addEventListener("submit", handleFormSubmission);
