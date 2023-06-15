import fetch from "node-fetch";

const _fetch = (url) => fetch(url).then((res) => res.json());

const productsRow = (products) => 
{
    const cotegoryObj ={}
    products.forEach(element => {
        if(cotegoryObj[element.category.id])
        {
            cotegoryObj[element.category.id].products.push(element);
        }
        else{
            cotegoryObj[element.category.id] = 
            {
                cotegory:
                {
                    id: element.cotegory.id,
                    name: element.cotegory.id
                },
                products:[element],
            }
        }
    });
    return Object.values(cotegoryObj);
}
const transferCurrency = (products, rate)=>{
    return products.map(el=> ({...el, price: el.price* rate}))
}
const cotegoryProdeut = async () => {
    const [products,egp]=await Promise.all
    ([
        _fetch("https://api.escuelajs.co/api/v1/products"),
        _fetch("https://api.exchangerate.host/latest?base=USD")
        .then(res=> res.rates['EGP']),
    ]);

    const trasformedPrices = transferCurrency
    (products,egp);
    const cotegoryProdeut =productsRow
    (trasformedPrices);
    console.log(JSON.stringify(cotegoryProdeut, null, 2))
}
cotegoryProdeut()