package universite_Paris8.iut.imeilleur;

import java.util.ArrayList;


public class EtatCivil {

	private ArrayList<Personne> registre;

	public EtatCivil(ArrayList<Personne> l) {
		registre = l;
	}
	
	

	@Override
	public String toString() {
		return "EtatCivil [registre=" + registre + "]";
	}
	
	
	

}
