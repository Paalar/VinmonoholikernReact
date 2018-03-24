import React, { Component } from 'react';
import logo from "./images/logo.png";



class Banner extends Component {
    render() {
        return(
            <div className="pageheader">
                <img src={logo} alt="Vinmonoholikern"/>
            </div>
        );
    }
}

class SearchBar extends Component {
    render() {
        return (
            <div className="searchContainer">
                <form className="searchBarContainer">
                    <input type="text" name="Search" placeholder="Søk.." />
                </form>
            </div>
        );
    }
}

class Footer extends Component {
    render() {
        return(
            <div id="footer">
                <p> All bestilling, kjøp og utlevering skjer fra, av eller hos Vinmonopolet eller Vinmonopolets samarbeidspartnere </p>
                <p> All tekst og informasjon blir hentet fra Vinmonopolets database. <a href="https://www.vinmonopolet.no/datadeling" target="_blank">https://www.vinmonopolet.no/datadeling </a> </p>
                <p>Kontakt: admin@vinmonoholikern.com</p>
            </div>
        );
    }
}

class GridDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden : true,
        }
    }

    handleClick() {
        console.log(this.state.isHidden);
        this.setState({
            isHidden : !this.state.isHidden,
        });
    }

    render() {
        return (
            <div className="grid-container">
                <div className="grid-item">
                    <input type="button" id="vinAvn" value="Vin"/>
                </div>
                <div className="grid-item">
                    <input type="button" id="olAvn" value="Øl, sider, mjød & sake"/>
                </div>
                <div className="grid-item">
                    <input type="button" id="brennAvn" value="Sprit & annet"/>
                </div>
                <div className="grid-item">
                    <input type="button" id="chapAvn" value="Champagne"/>
                </div>
                <div>
                </div>
                <div className="grid-item">
                    <input type="button" id="alkfriAvn" value="Alkoholfri"/>
                </div>
            </div>
        );
    }
}

class AdvancedSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render : false,
        }
    }

    handleClick() {
        this.setState({
            render : !this.state.render,
        });
    }

    render() {
        return (
            <div className="searchContainer">
                <button className="infoButtons" id="avsøk" onClick={() => this.handleClick()}>Avansert søk</button>
                <form id="advancedSearch">
                    {this.state.render && <GridDropDown />}
                    {this.state.render && <SearchButton />}
                </form>
                <form method="POST">
                    <input type="submit" name="Top200" value="Vis top 200 billigste varer på alkohol per krone" id="top200" className="infoButtons" />
                </form>
            </div>
        );
    }
}

class MainTemplate extends Component {
    render() {
        return(
            <div>
                <Banner />
                <SearchBar />
                <AdvancedSearch />
                <Footer />
            </div>
        );
    }
}

const SearchButton = () => (
    <div className="searchContainer">
        <input type="submit" name="Avansert" value="Søk" id="AvansertSøk" className="searchButton" />
    </div>
)

export default MainTemplate;
