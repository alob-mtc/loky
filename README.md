# Loky
our location service respontible for handling location basaed requirement for the system

## endpoints
[GET]=> /api/v1/countries 

returns an Array of countries
```js
{
    countries: [
        {
            name: String,
            id: Number
        }
    ]
}
```
[GET]=>  /api/v1/states?countryId=ID

returns an Array of states for the country with the ID
```js
{
    states: [
        {
            name: String,
            id: Number
        }
    ]
}
```
[GET]=> /api/v1/lga?stateId=ID

returns an Array of lgas for the state with the ID
```js
{
    lga: [
        {
            name: String,
            id: Number
        }
    ]
}
```
[POST]=> /api/v1/getdata

```js
    // post data

    // retrun data

```