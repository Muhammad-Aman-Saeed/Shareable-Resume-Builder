// listing element
document.getElementById('resumeForm')?.addEventListener('submit',function(event){
    event.preventDefault(); 

    // type assertion
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;


    if(nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement){
       
       
       
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        
        
        
        // resume output
        const resumeOutput = `
        <h2>Resume</h2>
        <p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span> </p>
        <p><strong>Email:</strong> <span id="edit-edit" class="editable"> ${email} </span> </p>
        <p><strong>Phone:</strong> <span id="edit-phone" class="editable"> ${phone} </span> </p>
        <p><strong>Address:</strong> <span id="edit-address" class="editable"> ${address} </span> </p>

        <h3>Education</h3>
        <p id="edit-education" class="editable"> ${education} </p>

        
        <h3>Experience</h3>
        <p id="edit-experience" class="editable"> ${experience} </p>

        
        <h3>Skills</h3>
        <p id="edit-skills" class="editable"> ${skills} </p>
        `;


// Resume Output
        const resumeOutputElement = document.getElementById('resumeOutput')
        if (resumeOutputElement){
            resumeOutputElement.innerHTML = resumeOutput
            resumeOutputElement.classList.remove('hidden');
        makeEditable();
// buttons
            const buttonsContainer = document.createElement('div');
            buttonsContainer.id = "buttonsContainer";
            resumeOutputElement.appendChild(buttonsContainer);

// PDF button
            const downloadButton = document.createElement('button');
            downloadButton.textContent = " Download as PDF";
            downloadButton.addEventListener('click', () => {
                window.print();
            })
            buttonsContainer.appendChild(downloadButton); 
// Shareable Link Button
            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Shareable Link";
            shareLinkButton.addEventListener("click", async () => {
                try {
                    // creat a new shareable link
                    const shareableLink = `https://yourdomain.com/resume/${name.replace(
                        /\s + /g,"__"
                    )}_resume.html`;

                    await navigator.clipboard.writeText(shareableLink);
                    alert ("Shareable link copied to clipboard");

                } catch (err) {
                    console.error("Failed to copy link:",err);
                    alert ("Failed to copy link to clipboard, Please try again.");
                }
        });
        buttonsContainer.appendChild(shareLinkButton);
        } else {
            console.error("Resume output container not found");
        }
    }
    else {
       console.error('One or more elements are missing')
   }
    }) 


    function makeEditable(){
        const editableElement = document.querySelectorAll('.editable');
        editableElement.forEach(element => {
            element.addEventListener('click', function(){
                const currentElement = element as HTMLElement;
                const currentValue= currentElement.textContent || "";
                
                
                // replace content
                if (currentElement.tagName === "p" || currentElement.tagName === "SPAN") {
                    const input = document.createElement ('input')
                    input.type= 'text'
                    input.value= currentValue
                    input.classList.add('editing-input')

                    input.addEventListener('blur', function(){
                        currentElement.textContent = input.value;
                        currentElement.style.display = 'inline';
                        input.remove() 
                    })

                    currentElement.style.display = "none"
                    currentElement.parentElement?.insertBefore(input,currentElement)
                    input.focus()


                }
            })
        })
    }