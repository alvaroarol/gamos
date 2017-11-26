document.getElementById('generate').addEventListener('click', function(){

    infos.brand = document.querySelectorAll('[name="brand"]')[0].value;
    infos.model = document.querySelectorAll('[name="model"]')[0].value;
    infos.year = document.querySelectorAll('[name="year"]')[0].value;
    infos.colour = document.querySelectorAll('[name="colour"]')[0].value;
    infos.name = document.querySelectorAll('[name="name"]')[0].value;
    infos.engine = document.querySelectorAll('[name="engine"]')[0].value;
    infos.capacity = document.querySelectorAll('[name="capacity"]')[0].value;
    infos.power = document.querySelectorAll('[name="power"]')[0].value;
    infos.torque = document.querySelectorAll('[name="torque"]')[0].value;
    infos.weight = document.querySelectorAll('[name="weight"]')[0].value;
    infos.transmission = document.querySelectorAll('[name="transmission"]')[0].value;
    infos.gearbox = document.querySelectorAll('[name="gearbox"]')[0].value;
    infos.acceleration = document.querySelectorAll('[name="acceleration"]')[0].value;

    var file = document.querySelectorAll('[name="photo"]')[0].files[0];

    var reader = new FileReader();
    reader.addEventListener("load", function () {
        createImage(reader.result, infos);
    }, false);

    reader.readAsDataURL(file);

});
