# VinmonoholikernReact
A React version of Vinmonoholikern (Django project is AlcoSearch)
The site is currently down, but can be reached at https://vinmonoholikern.com

Vinmonoholikern uses Vinmonopolets CSV database and sorts through the items by what is cheapest with the factors literprice and ABV.

This doesn't include the backend server or the sql database.


## Functionality to be added
- Include advanced search so you can filter on different types of alcohol
- Add the Swedish 'Systembolaget' so you can see what is cheaper where
- If possible connect the products sold with the location of the stores.
- CSS that fits mobile users. Removed bootstrap since it seems too inconsistent with React (different updates supporting different versions)

## Images 
The images are taken from devlopment and contains some fault. Example: All volumes are rounded down. 0.75L = 0L
What you see on entering the site
![Frontpage](https://github.com/Paalar/VinmonoholikernReact/blob/master/images/frontpage.png)

What you see if you search for 'Tequila'
Clicking the names will send you to their appropriate Vinmonopol product site.
![Tequila Page](https://github.com/Paalar/VinmonoholikernReact/blob/master/images/tequilasearch.png)
