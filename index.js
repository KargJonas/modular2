function myComp(props) {
    let elements = "";

    for (let i = 0; i < props.amount; i++) {
        elements += <h1 class="lol">${i+1}</h1>;
    }

    return elements;
}

let myEl = <h1>Test</h1>;

console.log(myEl);


function render() {
    Modular.render(
        <myComp amount={100} />,
        document.querySelector("#root"),
    );
}

render();

// window.addEventListener("click", render);
// window.addEventListener("resize", render);