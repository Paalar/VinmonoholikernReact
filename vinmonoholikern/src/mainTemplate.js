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
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    searchForProduct(query){
        fetch('products/search', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        }).then(res => res.json())
          .then(this.setState({ products : [] }))
          .then(products => this.setState({ products }));
    };

    getText = (event) => {
        if(event.key == "Enter") {
            this.searchForProduct({
                description: "Text for search bar",
                public: true,
                content : event.target.value,
            });
        };
    }
    render() {
        return (
            <div className="searchContainer">
                <input type="text"  id="searchBar" name="Search" placeholder="Søk.."  onKeyPress={this.getText}/>
                {this.state.products.length > 0 && <Tables products = {this.state.products}/>}
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
                <form>
                    <input type="submit" name="Top200" value="Top 200" id="top200" className="infoButtons" />
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
            </div>
        );
    }
}

class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products : props.products,
        }
    }

    render() {
        return (
            <div className="product-table-div">
                <table className="product-table" id="infoTable">
                    <thead className="product-thead">
                        <tr>
                            <th id="Varenavn">Varenavn</th>
                            <th id="Varetype">Varetype</th>
                            <th id="Apk">Alkohol per krone</th>
                            <th id="Alkoholprosent">Alkoholprosent</th>
                            <th id="Pris">Pris</th>
                            <th id="Volum">Volum</th>
                            <th id="Produktutvalg">Produktutvalg</th>
                            <th id="Land">Land</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map( product =>
                            <tr key={product.Varenummer}>
                                <td className="leftAlign"><a href={product.Vareurl} open="_blank">{product.Varenavn}</a></td>
                                <td className="leftAlign">{product.Varetype}</td>
                                <td>{product.APK}</td>
                                <td>{product.Alkohol}</td>
                                <td>{product.Pris}</td>
                                <td>{product.Volum}</td>
                                <td className="leftAlign">{product.Produktutvalg}</td>
                                <td className="leftAlign">{product.Land}</td>
                            </tr>
                            )}
                    </tbody>
                </table>
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
