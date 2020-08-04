function deleteByID(array, id) {
    var index;
    for (let i = 0; i < array.length; i++) {
        if(array[i].id == id){
            index = i;
            break;
        }
    }

    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}
