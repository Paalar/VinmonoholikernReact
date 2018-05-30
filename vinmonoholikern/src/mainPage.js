import React, { Component } from 'react';
import logo from "./images/logo.png";

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search: "",
        }
        this.searchInput = null;
        this.login = false;
    }

    handleClick() {
        fetch('products/top200', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
          .then(this.setState({ products : [] }))
          .then(products => this.setState({ products }))
          .then(this.setState({search: "Top 200"}));
    }

    searchForProduct(query) {
        fetch('products/search', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        }).then(res => res.json())
          .then(this.setState({ products : [] }))
          .then(products => this.setState({ products }))
          .then(this.setState({search: query.content}));
    };

    getText = (event) => {
        var result = event.target.value;
        if(event.key === "Enter") {
            if (result !== "") {
                this.searchForProduct({
                description: "Text for search bar",
                public: true,
                content : event.target.value,
                });
                this.searchInput.value = "";
                this.login = true;
            } else {
                this.setState({
                    products : [],
                    search: "",
                 });
                 this.login = false;
            }
        };
    }

    componentDidMount() {
        this.searchInput.focus();
    }

    loginText() {
        return(
            <div id="loginText">
                <p>Vinmonoholikern bruker vinmonopolets database og finner den billigste varen vinmonopolet har basert på alkoholprosent og literpris.</p>
                <p>APK står for alkohol per krone som er hva Vinmonoholikern sortere varene etter</p>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Banner />
                    <div className="searchContainer">
                        <input type="text" autoComplete="off" ref={e => this.searchInput = e} id="searchBar" name="Search" placeholder="Søk på navn" onKeyPress={this.getText}/>
                        <AdvancedSearch />
                        <button name="Top200" value="Top 200" id="top200" className="infoButtons" onClick={(event) => { this.handleClick(); this.searchInput.focus();}}>De 200 billigste</button>
                    </div>
                    {this.state.products.length > 0 && <Tables products = {this.state.products} search = {this.state.search}/>}
                    {this.login === false && this.loginText()}
                </div>
                <Footer />
            </div>
        );
    }
}

class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : props.products,
            search : props.search,
            hide : false,
            filtered: props.products,
        }
    }

    handleClick() {
        this.setState({hide : !this.state.hide});
        this.filterProducts();
    }

    getResultText() {
        if (this.state.search === "Top 200") {
            return <h1>{this.state.search}</h1>
        } else if (this.state.filtered.length >= 250) {
            return <div>
                <h1>{this.state.search} ({this.state.filtered.length})</h1>
                <h1>Det har blitt satt en grense på 250 varer</h1>
            </div>
        }
        return <h1>{this.state.search} ({this.state.filtered.length})</h1>
    }

    filterProducts() {
        if(!this.state.hide) {
            this.setState ({filtered : this.state.products.filter(product => product.Produktutvalg !== "Bestillingsutvalget")});
        } else {
            this.setState ({filtered : this.state.products});
        }
    }

    handleProduktutvalg(utvalg) {
        if (utvalg==="Bestillingsutvalget") {
            return "Må bestilles";
        }
        return "I butikk";
    }

    render() {
        return (
            <div className="product-table-div">
                {this.getResultText()}
                <input type="checkbox" name="checkbox" id="checkbox" onClick={() => this.handleClick()}/>
                <label htmlFor="checkbox">Fjern bestillingsvarer</label>
                <table cellSpacing="0" cellPadding="0" className="product-table" id="infoTable">
                    <thead className="product-thead">
                        <tr>
                            <th id="Varenavn">Varenavn</th>
                            <th id="Varetype">Varetype</th>
                            <th id="Apk">APK</th>
                            <th id="Alkoholprosent">Alkoholprosent</th>
                            <th id="Pris">Pris</th>
                            <th id="Volum">Volum</th>
                            <th id="Produktutvalg">Produktutvalg</th>
                            <th id="Land">Land</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filtered
                            .map( filtered =>
                            <tr key={filtered.Varenummer}>
                                <td className="leftAlign"><a href={filtered.Vareurl} target="_blank">{filtered.Varenavn}</a></td>
                                <td className="leftAlign">{filtered.Varetype}</td>
                                <td>{filtered.APK} kr</td>
                                <td>{filtered.Alkohol}%</td>
                                <td>{filtered.Pris} kr</td>
                                <td>{filtered.Volum} l</td>
                                <td className="leftAlign">{this.handleProduktutvalg(filtered.Produktutvalg)}</td>
                                <td className="leftAlign">{filtered.Land}</td>
                            </tr>
                            )}
                    </tbody>
                </table>
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
                {this.state.render && <GridDropDown />}
                {this.state.render && <button>Søk</button>}
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
        this.setState({
            isHidden : !this.state.isHidden,
        });
    }

    render() {
        return (
            <div className="grid-container">
                <div className="grid-item">
                    <input type="button" id="vinAvn" value="Vin"/>
                    <GridItem name={"vin"} id="svin" className="vin"/>
                </div>
                <div className="grid-item">
                    <input type="button" id="olAvn" value="Øl, sider, mjød & sake"/>
                    <GridItem name={"sake"} id={"ssake"} className="sake"/>
                </div>
                <div className="grid-item">
                    <input type="button" id="brennAvn" value="Sprit & annet"/>
                    <GridItem name={"sprit"} id={"ssprit"} className="sprit"/>
                </div>
                <div className="grid-item">
                    <input type="button" id="chapAvn" value="Champagne"/>
                    <GridItem name={"champagne"} id={"chmp"} className={"champagne"}/>
                </div>
                <div>
                </div>
                <div className="grid-item">
                    <input type="button" id="alkfriAvn" value="Alkoholfri"/>
                    <GridItem name={"alkohol"} id={"bad"} className={"alkoholfri"}/>
                </div>
            </div>
        );
    }
}

class GridItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected : false,
    }
  }

  handleClick() {
    this.setState =  {
      isSelected : !this.state.isSelected,
    }
  }

  render() {
    return (
      <div>
        <input type="checkbox" id={this.props.id}/>
        <label for={this.props.id}>{this.props.name}</label>
      </div>
    );
  }
}

const Banner = () => (
    <div className="pageheader">
        <img src={logo} alt="Vinmonoholikern"/>
    </div>
);

const Footer = () => (
    <div id="footer">
        <p> All bestilling, kjøp og utlevering skjer fra, av eller hos Vinmonopolet eller Vinmonopolets samarbeidspartnere </p>
        <p> All tekst og informasjon blir hentet fra Vinmonopolets database. <a href="https://www.vinmonopolet.no/datadeling" rel="noopener noreferrer" target="_blank">https://www.vinmonopolet.no/datadeling </a> </p>
        <p>Kontakt: admin@vinmonoholikern.com</p>
    </div>
);

export default MainPage;
