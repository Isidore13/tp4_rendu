package universite_Paris8.iut.imeilleur;

public class Personne {

	private int anneeNaissance;
	private int anneeMort;
	private String nom;

	public Personne(String nom, int naissance) {
		this.nom = nom;
		anneeNaissance = naissance;
		anneeMort = -1;
	}

	public int getAnneeMort() throws PasMortException {
		if (anneeMort != -1) {
			return anneeMort;
		} else
			throw new PasMortException();
	}

	public int getAnneeNaissance() {
		return this.anneeNaissance;
	}

	public void meurt(int annee) throws DeJaMortException {
		if (anneeMort != -1)
			throw new DeJaMortException();
		else
			anneeMort = annee;
	}

	public String getNom() {
		return nom;
	}

	@Override
	public String toString() {
		return "Personne [anneeNaissance=" + anneeNaissance + ", anneeMort=" + anneeMort + ", nom=" + nom + "]";
	}
	
}
