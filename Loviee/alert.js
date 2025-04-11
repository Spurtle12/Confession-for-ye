function displayMessage() {
  const name = document.getElementById("userName").value;
  const resultDiv = document.getElementById("result");  

  if (name.trim() !== "") {
    const message1 = `Hello, ${name}!`;
    const message2 = "sobrang late ko na naisend, nung February 14 ko dapat isesend to e, kaso naudlot.";
    const message3 = "anyway, I Hope you're having a great day";
    const message4 = "and also, i am happy that we get to talk again after month(s)";
    const message5 = "i am so grateful kasi nagreply ka nung nag chat ako sayo.";
    const message6 = "and... I hope you liked this:)";
    const message7 = "and i hope i made you smile with this.";

    alert(message1);
    alert(message2);
    alert(message3);
    alert(message4);
    alert(message5);
    alert(message6);
    alert(message7);
    
  } else {
    alert("Please enter your name!");
  }
}

document.getElementById("submitButton").addEventListener("click", displayMessage);
