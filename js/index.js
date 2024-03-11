// Evento della pagina principale sul button 
document.addEventListener("DOMContentLoaded", () => {
    // Evento click del button proceed presente nella pagina principale
    document.getElementById("proceedBtn").addEventListener("click", () => {
        
        // verifica la condizione se è stata attivato il checkbox
        if (document.getElementById("promiseCheck").checked) {
            // Se la condizione è verificata va alla pagina questione.html
            window.location.href = "question.html";
            console.log("Vai alla question...");
        } else {
            // Altrimenti se la condizione non è verificata rimane nella pagina principale e visualizza un msg di errore
            document.getElementsByClassName("msg-error")[0].style.display = "block";
            // Visualizza il messaggio di errore per un determinato periodo in millesecondi
            setTimeout(() => {
                document.getElementsByClassName("msg-error")[0].style.display = "none";
            }, 1500);
        }
    })  
});