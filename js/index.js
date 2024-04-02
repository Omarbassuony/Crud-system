var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var addproduct = document.getElementById("addproduct");
var updateproductb = document.getElementById("updateproductb");
var productContainerElement = document.getElementById("productContainerElement");
var updateProductIndex;
var productslist;

var nameRegex = /^[A-Z].+$/;
var descriptionRegex = /^[a-z\s]{4,100}$/;

if(localStorage.getItem("product")!==null)
{
  productslist =JSON.parse(localStorage.getItem("product"));
  displayproducts(productslist);
}else{
  productslist = []
}




function addProduct()
{
  if(validate(productNameInput, nameRegex) &&
  validate(productDescriptionInput, descriptionRegex) == true)
  {
    var product =
    {
        productName: productNameInput.value,
        productPrice: productPriceInput.value,
        productCategory: productCategoryInput.value,
        productDescription: productDescriptionInput.value,
        productImage: productImageInput.files[0].name
    }
    productslist.push(product);
    localStorage.setItem("product", JSON.stringify(productslist));
    displayproducts(productslist)
    resetProductInputs()
  }
   
   
}

function resetProductInputs()
{
   productNameInput.value=null;
   productNameInput.classList.remove("is-valid", "is-invalid");
   productPriceInput.value=null;
   productCategoryInput.value="Choose Product Category";
   productDescriptionInput.value=null;
   productDescriptionInput.classList.remove("is-valid", "is-invalid");
   productImageInput.files[0].name = null;
}


function displayproducts(arr)
{
    var containerElement = ``;
    for(var i=0 ; i<arr.length ;i++ )
    {
      containerElement+= ` <div class="col mb-4">
        <div class="border shadow-sm p-2">
          <div class="product-img mb-4">
            <img src="./images/${arr[i].productImage}" class="w-100 h-100 object-fit-contain" alt="">
          </div>
          <h3 class="fs-5">${arr[i].productName}</h3>
          <p class="fs-6 text-secondary">${arr[i].productDescription}.</p>
          <p><span class="fw-semibold">Category: </span>${arr[i].productCategory}</p>
          <div class="d-flex justify-content-between pe-3">
            <p class="fw-semibold">${arr[i].productPrice} EGP</p>
            <div>
              <i onclick='deleteProduct(${i})' class="fa-solid fa-trash-can fs-5 text-danger"></i>
              <i onclick='moveproduct(${i})' class="fa-solid fa-pen-to-square fs-5 text-success"></i>
            </div>
          </div>
        </div>
      </div>`;
    
    }
    productContainerElement.innerHTML = containerElement;
}

function deleteProduct(i)
{
  productslist.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(productslist));
  displayproducts(productslist);
}

function searchByName(term)
{
  var filterproduct=[];
for(var i=0; i<productslist.length; i++)
{
  if(productslist[i].productName.toLowerCase().includes(term.toLowerCase())==true)
  {
    filterproduct.push(productslist[i]);
  }
}
console.log(filterproduct);
displayproducts(filterproduct);
}

function moveproduct(index)
{
  productNameInput.value=productslist[index].productName;
  productPriceInput.value=productslist[index].productPrice;
  productCategoryInput.value=productslist[index].productCategory;
  productDescriptionInput.value=productslist[index].productDescription;
  
  addproduct.classList.replace("d-block","d-none");
  updateproductb.classList.replace("d-none","d-block");
  updateProductIndex = index;
}

function updateproduct()
{
  if(validate(productNameInput, nameRegex) &&
  validate(productDescriptionInput, descriptionRegex))
  {
    productslist[updateProductIndex].productName= productNameInput.value;
    productslist[updateProductIndex].productPrice= productPriceInput.value;
    productslist[updateProductIndex].productCategory= productCategoryInput.value;
    productslist[updateProductIndex].productDescription= productDescriptionInput.value;
  
    if(productImageInput.files[0]!=undefined)
    {
      productslist[updateProductIndex].productImage =productImageInput.files[0].name;
    }
    displayproducts(productslist);
    localStorage.setItem("product", JSON.stringify(productslist));
    addproduct.classList.replace("d-none", "d-block");
    updateproductb.classList.replace("d-block", "d-none");
    resetProductInputs()
  }

}


function validate(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  }
else
{
  element.classList.remove("is-valid");
  element.classList.add("is-invalid");
  return false;
}
 
}