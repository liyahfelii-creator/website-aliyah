const supabaseAccessee = window.supabase.createClient("https://wpjvkduaxockmuyccgqu.supabase.co", "sb_publishable_bzernbtU4yV_xWswaXeU7A_EL2tl79U");

async function getComments() {
    const { data, error } = await supabaseAccessee
        .from('like')
        .select('*');
    console.log(data);
    console.log(error);
    data.forEach(comment => {
        const commentSection = document.querySelector("#comments-section");
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.innerHTML = `
            <p><strong>${comment.name}</strong> (${comment.email})</p>
            <p>${comment.message}</p>
            <p>Reaction: ${comment.reaction}</p>`;
        commentSection.appendChild(commentDiv);
    });
}

getComments();

const commentForm = document.querySelector("#myform");
commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const comment = document.querySelector("#message").value;
    const reaction = document.querySelector(".choice").dataset.value;

    const { data, error } = await supabaseAccessee
        .from('like')
        .insert([{
            name: username,
            message: comment,
            email: email,
            reaction: reaction
        }]);
        console.log(data);
        console.log(error);
        commentForm.reset();
        getComments();

});



// const reactButtons = document.querySelectorAll(".choice");
// reactButtons.classList.remove("active");
