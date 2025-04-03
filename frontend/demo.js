let card = $(".card");
let editvalue = $("#editvalue");
let title = $("#title");
let description =$("#description");
let editId;
let date = new Date().toLocaleDateString()

function addbtn(){
    
    $("#addbtn").click(function() {
        $(".form-container").show();
    });
    $(".editbtn").click(function(){
        $(".form-container").show();
    });
    
    $(".cancel-btn").click(function() {
        $(".form-container").hide();
    });
    $(".save").click(function() {
        $(".form-container").hide();
    });
    
}

function getValue(){
    
    $.get("http://localhost:3000/notes",
        function(response){
            console.log(response);
            response.forEach(a =>{
                card.append(`<div class="maindiv">
                <h3>Title :</h3> 
                <h4>${a.title}</h4>
                <h3>Discription :</h3>
                <p>${a.description}</p>
                <p>${date}</p>
                <div class="edit-del">
                <button class="btn editbtn" id="editvalue" onclick="editValue(${a.id})" >Edit</button>
                <button class="btn delbtn" onclick="deleteValue(${a.id})">Delete</button>
                </div>
                </div>`)

                $(".maindiv").hover(
                    function(){
                        $(this).children(".edit-del").show()
                    },
                    function(){
                        $(".edit-del").hide()
                    }
                ) 
            })    
    })
}

getValue()

function addValue(event){
    event.preventDefault()

    if($(".save").text() === "Edit"){
        $.ajax({
            url: `http://localhost:3000/notes/${editId}`,
            type: "PUT",
            data:({
                title: title.val().trim(),
                description: description.val().trim(),
            })
            
        });

       
    }
    else
    {
        $.post("http://localhost:3000/notes",
        
            {
              "title":  $("#title").val().trim(),
               "description": $("#description").val().trim()    
        },
        getValue()
    )}
  
}

function deleteValue(id) {
    $.ajax({
        url: `http://localhost:3000/notes/${id}`,
        type: "DELETE",
        success: function() {
        }
    });
}

function editValue(id){
    editId = id 
   
    addbtn()
    $(".save").text("Edit")
    $.get(`http://localhost:3000/notes/${id}`,function(response){
        title.value =response.title,
        description.value =response.description

    });

    console.log(editId,"okokk");

}



